import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export async function getDashboardStats(_req: Request, res: Response) {
  const [totalUsers, totalEvents, totalProviders, totalBookings] = await Promise.all([
    prisma.user.count(),
    prisma.event.count(),
    prisma.providerProfile.count(),
    prisma.booking.count(),
  ]);

  res.json({ totalUsers, totalEvents, totalProviders, totalBookings });
}

export async function listUsers(_req: Request, res: Response) {
  const users = await prisma.user.findMany({
    include: { clientProfile: true, providerProfile: true, adminProfile: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json(users.map(({ password: _password, ...u }) => u));
}

export async function listEvents(_req: Request, res: Response) {
  const events = await prisma.event.findMany({ include: { client: true } });
  res.json(events);
}

export async function listBookings(_req: Request, res: Response) {
  const bookings = await prisma.booking.findMany({
    include: { event: true, service: { include: { provider: true } } },
  });
  res.json(bookings);
}

// Soft-delete is preferable to hard delete here since users may have events,
// bookings, or services tied to them — flag it instead of cascading data loss.
export async function deleteUser(req: Request, res: Response) {
  const userId = Number(req.params.userId);
  const hasEvents = await prisma.event.findFirst({ where: { clientId: userId } });
  const hasBookings = await prisma.service.findFirst({
    where: { providerId: userId, bookings: { some: {} } },
  });

  if (hasEvents || hasBookings) {
    return res.status(409).json({
      error: 'Cannot delete a user with existing events or bookings. Consider deactivating instead.',
    });
  }

  await prisma.user.delete({ where: { id: userId } });
  res.json({ message: 'User deleted' });
}