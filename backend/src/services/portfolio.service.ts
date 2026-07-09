import { prisma } from '../lib/prisma';

export async function createPortfolio(
  providerId: number,
  data: { title: string; description?: string },
) {
  return prisma.portfolio.create({
    data: { providerId, ...data },
  });
}

async function assertOwnedByProvider(portfolioId: number, providerId: number) {
  const portfolio = await prisma.portfolio.findFirst({ where: { id: portfolioId, providerId } });
  if (!portfolio) throw new Error('Portfolio not found or not owned by this provider');
  return portfolio;
}

export async function updatePortfolio(
  portfolioId: number,
  providerId: number,
  data: Partial<{ title: string; description: string }>,
) {
  await assertOwnedByProvider(portfolioId, providerId);
  return prisma.portfolio.update({ where: { id: portfolioId }, data });
}

export async function deletePortfolio(portfolioId: number, providerId: number) {
  await assertOwnedByProvider(portfolioId, providerId);
  // onDelete: Cascade on PortfolioImage handles cleanup of the DB rows —
  // note this does NOT delete the actual files on disk, see deleteImage below
  // for why that's handled separately per-image.
  return prisma.portfolio.delete({ where: { id: portfolioId } });
}

export async function addPortfolioImage(portfolioId: number, providerId: number, imagePath: string) {
  await assertOwnedByProvider(portfolioId, providerId);
  return prisma.portfolioImage.create({
    data: { portfolioId, imagePath },
  });
}

export async function deletePortfolioImage(imageId: number, providerId: number) {
  const image = await prisma.portfolioImage.findFirst({
    where: { id: imageId, portfolio: { providerId } },
  });
  if (!image) throw new Error('Image not found or not owned by this provider');

  await prisma.portfolioImage.delete({ where: { id: imageId } });
  return image; // caller can use image.imagePath to also delete the file from disk
}
