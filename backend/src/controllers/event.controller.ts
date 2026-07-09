import { Request, Response } from 'express';
import * as eventService from '../services/event.service';

export async function createEvent(req: Request, res: Response) {
  const event = await eventService.createEvent(req.auth!.userId, req.body);
  res.status(201).json(event);
}

export async function getMyEvents(req: Request, res: Response) {
  const events = await eventService.getClientEvents(req.auth!.userId);
  res.json(events);
}