import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';

export type Role = 'admin' | 'client' | 'provider';

export function resolveRole(user: {
  adminProfile: unknown;
  clientProfile: unknown;
  providerProfile: unknown;
}): Role {
  if (user.adminProfile) return 'admin';
  if (user.providerProfile) return 'provider';
  return 'client';
}

export async function registerClient(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  wilaya?: string;
  preferences?: string;
}) {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) throw new Error('An account with this email already exists');

  const passwordHash = await bcrypt.hash(data.password, 12);

  return prisma.user.create({
    data: {
      email: data.email,
      password: passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      address: data.address,
      wilaya: data.wilaya,
      clientProfile: { create: { preferences: data.preferences ?? '' } },
    },
    include: { clientProfile: true },
  });
}

export async function registerProvider(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  wilaya?: string;
  serviceCategory?: string;
  experience?: string;
  certification?: string;
  studyDegree?: string;
}) {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) throw new Error('An account with this email already exists');

  const passwordHash = await bcrypt.hash(data.password, 12);

  return prisma.user.create({
    data: {
      email: data.email,
      password: passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      address: data.address,
      wilaya: data.wilaya,
      providerProfile: {
        create: {
          serviceCategory: data.serviceCategory,
          experience: data.experience,
          certification: data.certification,
          studyDegree: data.studyDegree,
        },
      },
    },
    include: { providerProfile: true },
  });
}

export async function verifyLogin(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { clientProfile: true, providerProfile: true, adminProfile: true },
  });
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;

  return { user, role: resolveRole(user) };
}