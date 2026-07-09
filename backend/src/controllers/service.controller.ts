import { Request, Response } from 'express';
import * as serviceService from '../services/service.service';

export async function createService(req: Request, res: Response) {
  const service = await serviceService.createService(req.auth!.userId, req.body);
  res.status(201).json(service);
}

export async function updateService(req: Request, res: Response) {
  const serviceId = Number(req.params.serviceId);
  const service = await serviceService.updateService(serviceId, req.auth!.userId, req.body);
  res.json(service);
}

export async function deleteService(req: Request, res: Response) {
  const serviceId = Number(req.params.serviceId);
  await serviceService.deleteService(serviceId, req.auth!.userId);
  res.json({ message: 'Service deleted' });
}
