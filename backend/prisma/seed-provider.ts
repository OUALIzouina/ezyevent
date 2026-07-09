import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Sample providers spanning the categories a wedding/event platform needs.
// All share the same password for convenience during testing.
const DEFAULT_PASSWORD = 'password123';

const PROVIDERS = [
  {
    email: 'nada.photography@ezyevent.test',
    firstName: 'Nada',
    lastName: 'Abada',
    phone: '0555123456',
    wilaya: 'Alger',
    address: '12 Rue des Frères, Alger',
    serviceCategory: 'Photography',
    experience: 'Over 10 years of experience shooting weddings and events across Algeria.',
    certification: 'Certified Professional Photographer (CPP)',
    studyDegree: 'Bachelor in Visual Arts',
    services: [
      { serviceName: 'Wedding Photography', category: 'Photography', description: 'Full-day wedding coverage including ceremony, reception, and edited album.' },
      { serviceName: 'Engagement Shoot', category: 'Photography', description: '1-hour outdoor or studio engagement photo session.' },
    ],
  },
  {
    email: 'karim.catering@ezyevent.test',
    firstName: 'Karim',
    lastName: 'Belhadj',
    phone: '0555234567',
    wilaya: 'Oran',
    address: '45 Boulevard de la Soummam, Oran',
    serviceCategory: 'Catering',
    experience: '15 years catering weddings, corporate events, and large celebrations.',
    certification: 'HACCP Food Safety Certified',
    studyDegree: 'Diploma in Culinary Arts',
    services: [
      { serviceName: 'Wedding Buffet (100-300 guests)', category: 'Catering', description: 'Full traditional and modern Algerian buffet with service staff.' },
      { serviceName: 'Corporate Lunch Catering', category: 'Catering', description: 'Business lunch catering for meetings and conferences.' },
    ],
  },
  {
    email: 'lina.decor@ezyevent.test',
    firstName: 'Lina',
    lastName: 'Cherif',
    phone: '0555345678',
    wilaya: 'Sétif',
    address: '8 Cité El Hidhab, Sétif',
    serviceCategory: 'Decoration',
    experience: '8 years designing themed event decor — weddings, birthdays, engagements.',
    certification: 'Certified Event Designer',
    studyDegree: 'Diploma in Interior Design',
    services: [
      { serviceName: 'Wedding Hall Decoration', category: 'Decoration', description: 'Full hall decoration including floral arrangements, lighting, and table settings.' },
      { serviceName: 'Birthday Party Setup', category: 'Decoration', description: 'Themed balloon arches, backdrops, and table decor.' },
    ],
  },
  {
    email: 'yacine.dj@ezyevent.test',
    firstName: 'Yacine',
    lastName: 'Mansouri',
    phone: '0555456789',
    wilaya: 'Alger',
    address: '3 Rue Didouche Mourad, Alger',
    serviceCategory: 'Music & Entertainment',
    experience: '12 years as a wedding and event DJ across Algeria and abroad.',
    certification: null,
    studyDegree: null,
    services: [
      { serviceName: 'Wedding DJ & Sound System', category: 'Music & Entertainment', description: 'Full sound system, lighting, and MC services for the full event.' },
      { serviceName: 'Live Band Coordination', category: 'Music & Entertainment', description: 'Coordination with a live traditional band for ceremonies.' },
    ],
  },
  {
    email: 'sara.venue@ezyevent.test',
    firstName: 'Sara',
    lastName: 'Boudiaf',
    phone: '0555567890',
    wilaya: 'Constantine',
    address: '22 Avenue Aouati Mostefa, Constantine',
    serviceCategory: 'Venue',
    experience: '6 years managing event halls for weddings and corporate functions.',
    certification: 'Event Management Certificate',
    studyDegree: 'Bachelor in Hospitality Management',
    services: [
      { serviceName: 'Grand Hall Rental (up to 400 guests)', category: 'Venue', description: 'Air-conditioned hall with parking, stage, and kitchen access.' },
      { serviceName: 'Garden Venue Rental', category: 'Venue', description: 'Outdoor garden venue for smaller, intimate ceremonies.' },
    ],
  },
  {
    email: 'amine.makeup@ezyevent.test',
    firstName: 'Amine',
    lastName: 'Taleb',
    phone: '0555678901',
    wilaya: 'Bousaâda',
    address: '5 Rue de l\'Indépendance, Bousaâda',
    serviceCategory: 'Beauty & Makeup',
    experience: '5 years as a bridal makeup artist and hairstylist.',
    certification: 'Professional Makeup Artistry Diploma',
    studyDegree: null,
    services: [
      { serviceName: 'Bridal Makeup & Hair', category: 'Beauty & Makeup', description: 'Full bridal look including trial session.' },
      { serviceName: 'Bridal Party Makeup', category: 'Beauty & Makeup', description: 'Makeup for bridesmaids and family members.' },
    ],
  },
];

async function main() {
  console.log(`Seeding ${PROVIDERS.length} providers...\n`);
  const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 12);

  for (const provider of PROVIDERS) {
    const existing = await prisma.user.findUnique({ where: { email: provider.email } });
    if (existing) {
      console.log(`Skipped (already exists): ${provider.email}`);
      continue;
    }

    const user = await prisma.user.create({
      data: {
        email: provider.email,
        password: passwordHash,
        firstName: provider.firstName,
        lastName: provider.lastName,
        phone: provider.phone,
        wilaya: provider.wilaya,
        address: provider.address,
        providerProfile: {
          create: {
            serviceCategory: provider.serviceCategory,
            experience: provider.experience,
            certification: provider.certification ?? undefined,
            studyDegree: provider.studyDegree ?? undefined,
            isAvailable: true,
            services: {
              create: provider.services,
            },
          },
        },
      },
    });

    console.log(`Created: ${provider.firstName} ${provider.lastName} (${provider.serviceCategory}) — ${user.email}`);
  }

  console.log(`\nDone. All seeded providers share the password: "${DEFAULT_PASSWORD}"`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());