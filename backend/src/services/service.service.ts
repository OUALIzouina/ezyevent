import { prisma } from '../lib/prisma';

export async function createService(
  providerId: number,
  data: { serviceName: string; category: string; description?: string },
) {
  return prisma.service.create({
    data: { providerId, ...data },
  });
}

async function assertOwnedByProvider(serviceId: number, providerId: number) {
  const service = await prisma.service.findFirst({ where: { id: serviceId, providerId } });
  if (!service) throw new Error('Service not found or not owned by this provider');
  return service;
}

export async function updateService(
  serviceId: number,
  providerId: number,
  data: Partial<{ serviceName: string; category: string; description: string }>,
) {
  await assertOwnedByProvider(serviceId, providerId);
  return prisma.service.update({ where: { id: serviceId }, data });
}

export async function deleteService(serviceId: number, providerId: number) {
  await assertOwnedByProvider(serviceId, providerId);

  // A service with existing bookings shouldn't just vanish — that would
  // orphan booking history a client or admin might still need to see.
  const hasBookings = await prisma.booking.findFirst({ where: { serviceId } });
  if (hasBookings) {
    throw new Error('Cannot delete a service with existing bookings. Consider hiding it instead.');
  }

  return prisma.service.delete({ where: { id: serviceId } });
}
