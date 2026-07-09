import { z } from 'zod';

export const registerClientSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  phone: z.string().max(20).optional(),
  address: z.string().max(200).optional(),
  wilaya: z.string().max(50).optional(),
  preferences: z.string().max(100).optional(),
});

export const registerProviderSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  phone: z.string().max(20).optional(),
  address: z.string().max(200).optional(),
  wilaya: z.string().max(50).optional(),
  serviceCategory: z.string().max(100).optional(),
  experience: z.string().max(500).optional(),
  certification: z.string().max(500).optional(),
  studyDegree: z.string().max(100).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const createEventSchema = z.object({
  title: z.string().min(1).max(100),
  date: z.coerce.date(),
  location: z.string().min(1).max(100),
});

export const requestBookingSchema = z.object({
  eventId: z.coerce.number().int().positive(),
  serviceId: z.coerce.number().int().positive(),
  bookingDate: z.coerce.date(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
}).refine((data) => data.endTime > data.startTime, {
  message: 'endTime must be after startTime',
  path: ['endTime'],
});

export const confirmPaymentSchema = z.object({
  paymentAmount: z.coerce.number().positive(),
  paymentFeePercentage: z.coerce.number().min(0).max(100),
});

// ---------------------------------------------------------------------------
// Services (provider-owned)
// ---------------------------------------------------------------------------

export const createServiceSchema = z.object({
  serviceName: z.string().min(1).max(100),
  category: z.string().min(1).max(50),
  description: z.string().max(500).optional(),
});

export const updateServiceSchema = createServiceSchema.partial();

// ---------------------------------------------------------------------------
// Portfolio (provider-owned)
// ---------------------------------------------------------------------------

export const createPortfolioSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
});

export const updatePortfolioSchema = createPortfolioSchema.partial();

// ---------------------------------------------------------------------------
// Provider self-update (availability toggle, about section, etc.)
// ---------------------------------------------------------------------------

export const updateProviderProfileSchema = z.object({
  serviceCategory: z.string().max(100).optional(),
  experience: z.string().max(500).optional(),
  certification: z.string().max(500).optional(),
  studyDegree: z.string().max(100).optional(),
  about: z.string().max(500).optional(),
  isAvailable: z.boolean().optional(),
});
