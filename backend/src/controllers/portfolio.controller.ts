import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import * as portfolioService from '../services/portfolio.service';

export async function createPortfolio(req: Request, res: Response) {
  const portfolio = await portfolioService.createPortfolio(req.auth!.userId, req.body);
  res.status(201).json(portfolio);
}

export async function updatePortfolio(req: Request, res: Response) {
  const portfolioId = Number(req.params.portfolioId);
  const portfolio = await portfolioService.updatePortfolio(portfolioId, req.auth!.userId, req.body);
  res.json(portfolio);
}

export async function deletePortfolio(req: Request, res: Response) {
  const portfolioId = Number(req.params.portfolioId);
  await portfolioService.deletePortfolio(portfolioId, req.auth!.userId);
  res.json({ message: 'Portfolio deleted' });
}

export async function uploadImage(req: Request, res: Response) {
  const portfolioId = Number(req.params.portfolioId);

  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' });
  }

  // Publicly reachable path — app.ts serves /uploads as static
  const imagePath = `/uploads/${req.file.filename}`;

  try {
    const image = await portfolioService.addPortfolioImage(portfolioId, req.auth!.userId, imagePath);
    res.status(201).json(image);
  } catch (err) {
    // Clean up the file we just wrote if the DB insert failed (e.g. ownership check)
    fs.unlink(req.file.path, () => {});
    throw err;
  }
}

export async function deleteImage(req: Request, res: Response) {
  const imageId = Number(req.params.imageId);
  const image = await portfolioService.deletePortfolioImage(imageId, req.auth!.userId);

  // Best-effort file cleanup — don't fail the request if this errors,
  // the DB row is already gone which is what matters most.
  const filePath = path.join(__dirname, '../../', image.imagePath);
  fs.unlink(filePath, () => {});

  res.json({ message: 'Image deleted' });
}
