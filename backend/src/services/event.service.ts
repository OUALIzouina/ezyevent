import { prisma } from '../lib/prisma';

export async function createEvent(clientId: number, data: { title: string; date: Date; location: string }) {
  return prisma.event.create({
    data: {
      clientId,
      title: data.title,
      date: data.date,
      location: data.location,
    },
  });
}

export async function getClientEvents(clientId: number) {
  return prisma.event.findMany({
    where: { clientId },
    orderBy: { date: 'asc' },
  });
}

export async function listProviders(filters?: { category?: string; wilaya?: string }) {
  return prisma.providerProfile.findMany({
    where: {
      isAvailable: true,
      serviceCategory: filters?.category ?? undefined,
      user: filters?.wilaya ? { wilaya: filters.wilaya } : undefined,
    },
    include: { user: true, services: true, portfolios: { include: { images: true } } },
  });
}

export async function getProviderProfile(providerId: number) {
  const provider = await prisma.providerProfile.findUnique({
    where: { providerId },
    include: { user: true, services: true, portfolios: { include: { images: true } } },
  });
  if (!provider) throw new Error('Provider not found');
  return provider;
}

export async function updateOwnProviderProfile(
  providerId: number,
  data: Partial<{
    serviceCategory: string;
    experience: string;
    certification: string;
    studyDegree: string;
    about: string;
    isAvailable: boolean;
  }>,
) {
  return prisma.providerProfile.update({
    where: { providerId },
    data,
  });
}
