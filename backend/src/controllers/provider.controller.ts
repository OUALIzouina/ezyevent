import { Request, Response } from 'express';
import * as eventService from '../services/event.service';
import * as bookingService from '../services/booking.service';

export async function listProviders(req: Request, res: Response) {
  const { category, wilaya } = req.query;
  const providers = await eventService.listProviders({
    category: category as string | undefined,
    wilaya: wilaya as string | undefined,
  });
  res.json(providers);
}

export async function getProviderProfile(req: Request, res: Response) {
  const providerId = Number(req.params.providerId);
  const provider = await eventService.getProviderProfile(providerId);
  res.json(provider);
}

export async function getContactDetails(req: Request, res: Response) {
  const providerId = Number(req.params.providerId);
  const details = await bookingService.getProviderContactDetails(providerId, req.auth!.userId);
  res.json(details);
}

export async function updateMyProfile(req: Request, res: Response) {
  const updated = await eventService.updateOwnProviderProfile(req.auth!.userId, req.body);
  res.json(updated);
}
