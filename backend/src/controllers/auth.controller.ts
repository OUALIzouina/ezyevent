import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { signToken, getCookieOptions } from '../middleware/auth.middleware';
import { prisma } from '../lib/prisma';

export async function registerClient(req: Request, res: Response) {
  const user = await authService.registerClient(req.body);
  res.status(201).json({ id: user.id, email: user.email });
}

export async function registerProvider(req: Request, res: Response) {
  const user = await authService.registerProvider(req.body);
  res.status(201).json({ id: user.id, email: user.email });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const result = await authService.verifyLogin(email, password);

  if (!result) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = signToken({ userId: result.user.id, role: result.role });
  res.cookie('token', token, getCookieOptions());
  res.json({
    id: result.user.id,
    email: result.user.email,
    role: result.role,
    firstName: result.user.firstName,
    lastName: result.user.lastName,
  });
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie('token', { ...getCookieOptions(), maxAge: undefined });
  res.json({ message: 'Logged out' });
}

export async function me(req: Request, res: Response) {
  const user = await prisma.user.findUnique({
    where: { id: req.auth!.userId },
    include: { clientProfile: true, providerProfile: true, adminProfile: true },
  });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const { password: _password, ...safeUser } = user;
  res.json({ ...safeUser, role: req.auth!.role });
}