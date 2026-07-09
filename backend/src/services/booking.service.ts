import { BookingStatus, PaymentStatus, Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';

// ---------------------------------------------------------------------------
// BOOKING REQUEST
// Wrapped in a Serializable transaction so the overlap check and the create
// are atomic — closes the race condition where two concurrent requests could
// both pass the conflict check before either commits.
// ---------------------------------------------------------------------------

export async function requestBooking(params: {
  eventId: number;
  serviceId: number;
  bookingDate: Date;
  startTime: Date;
  endTime: Date;
}) {
  const { eventId, serviceId, bookingDate, startTime, endTime } = params;

  return prisma.$transaction(
    async (tx) => {
      const service = await tx.service.findUnique({
        where: { id: serviceId },
        select: { providerId: true },
      });
      if (!service) throw new Error('Service not found');

      const conflict = await tx.booking.findFirst({
        where: {
          bookingDate,
          status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
          service: { providerId: service.providerId },
          startTime: { lt: endTime },
          endTime: { gt: startTime },
        },
      });

      if (conflict) {
        throw new Error('This provider is already booked during that time slot');
      }

      return tx.booking.create({
        data: {
          eventId,
          serviceId,
          bookingDate,
          startTime,
          endTime,
          status: BookingStatus.PENDING,
          paymentStatus: PaymentStatus.UNPAID,
        },
      });
    },
    { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
  );
}

// ---------------------------------------------------------------------------
// STATE TRANSITIONS
// ---------------------------------------------------------------------------

async function assertOwnedByProvider(bookingId: number, providerId: number) {
  const booking = await prisma.booking.findFirst({
    where: { id: bookingId, service: { providerId } },
  });
  if (!booking) throw new Error('Booking not found or not owned by this provider');
  return booking;
}

export async function acceptBooking(bookingId: number, providerId: number) {
  await assertOwnedByProvider(bookingId, providerId);
  return prisma.booking.update({
    where: { id: bookingId },
    data: { status: BookingStatus.CONFIRMED },
  });
}

export async function declineBooking(bookingId: number, providerId: number) {
  await assertOwnedByProvider(bookingId, providerId);
  return prisma.booking.update({
    where: { id: bookingId },
    data: { status: BookingStatus.CANCELLED },
  });
}

export async function confirmPayment(
  bookingId: number,
  providerId: number,
  paymentAmount: number,
  paymentFeePercentage: number,
) {
  if (paymentAmount <= 0) throw new Error('Invalid payment amount');
  await assertOwnedByProvider(bookingId, providerId);

  return prisma.booking.update({
    where: { id: bookingId },
    data: {
      paymentStatus: PaymentStatus.PAID,
      paymentAmount,
      paymentFeePercentage,
    },
  });
}

export async function completeBooking(bookingId: number, providerId: number) {
  const booking = await assertOwnedByProvider(bookingId, providerId);
  if (booking.paymentStatus !== PaymentStatus.PAID) {
    throw new Error('Cannot complete a booking before payment is confirmed');
  }
  return prisma.booking.update({
    where: { id: bookingId },
    data: { status: BookingStatus.COMPLETED },
  });
}

// ---------------------------------------------------------------------------
// DASHBOARDS
// ---------------------------------------------------------------------------

export async function getProviderDashboard(providerId: number) {
  const bookings = await prisma.booking.findMany({
    where: { service: { providerId } },
    include: { event: true, service: true },
    orderBy: { createdAt: 'desc' },
  });

  return {
    pendingRequests: bookings.filter((b) => b.status === BookingStatus.PENDING),
    toPay: bookings.filter(
      (b) => b.status === BookingStatus.CONFIRMED && b.paymentStatus === PaymentStatus.UNPAID,
    ),
    scheduled: bookings.filter(
      (b) => b.status === BookingStatus.CONFIRMED && b.paymentStatus === PaymentStatus.PAID,
    ),
    completed: bookings.filter((b) => b.status === BookingStatus.COMPLETED),
  };
}

export async function getClientDashboard(clientId: number) {
  return prisma.event.findMany({
    where: { clientId },
    include: {
      bookings: {
        include: { service: { include: { provider: { include: { user: true } } } } },
      },
    },
    orderBy: { date: 'asc' },
  });
}

// ---------------------------------------------------------------------------
// PROVIDER CONTACT DETAILS — gated behind a CONFIRMED booking
// ---------------------------------------------------------------------------

export async function getProviderContactDetails(providerId: number, clientId: number) {
  const confirmedBooking = await prisma.booking.findFirst({
    where: {
      status: BookingStatus.CONFIRMED,
      service: { providerId },
      event: { clientId },
    },
  });

  if (!confirmedBooking) {
    throw new Error('You can only view contact details for confirmed providers');
  }

  const provider = await prisma.providerProfile.findUnique({
    where: { providerId },
    include: { user: true },
  });
  if (!provider) throw new Error('Provider not found');

  return {
    name: `${provider.user.firstName} ${provider.user.lastName}`,
    email: provider.user.email,
    phone: provider.user.phone,
    address: provider.user.address,
    wilaya: provider.user.wilaya,
    category: provider.serviceCategory,
    experience: provider.experience,
    certification: provider.certification,
  };
}