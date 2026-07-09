import { Request, Response } from 'express';
import * as bookingService from '../services/booking.service';

export async function requestBooking(req: Request, res: Response) {
  const booking = await bookingService.requestBooking(req.body);
  res.status(201).json(booking);
}

export async function acceptBooking(req: Request, res: Response) {
  const bookingId = Number(req.params.bookingId);
  const booking = await bookingService.acceptBooking(bookingId, req.auth!.userId);
  res.json(booking);
}

export async function declineBooking(req: Request, res: Response) {
  const bookingId = Number(req.params.bookingId);
  const booking = await bookingService.declineBooking(bookingId, req.auth!.userId);
  res.json(booking);
}

export async function completeBooking(req: Request, res: Response) {
  const bookingId = Number(req.params.bookingId);
  const booking = await bookingService.completeBooking(bookingId, req.auth!.userId);
  res.json(booking);
}

export async function confirmPayment(req: Request, res: Response) {
  const bookingId = Number(req.params.bookingId);
  const { paymentAmount, paymentFeePercentage } = req.body;
  const booking = await bookingService.confirmPayment(
    bookingId,
    req.auth!.userId,
    paymentAmount,
    paymentFeePercentage,
  );
  res.json(booking);
}

export async function providerDashboard(req: Request, res: Response) {
  const dashboard = await bookingService.getProviderDashboard(req.auth!.userId);
  res.json(dashboard);
}

export async function clientDashboard(req: Request, res: Response) {
  const events = await bookingService.getClientDashboard(req.auth!.userId);
  res.json(events);
}