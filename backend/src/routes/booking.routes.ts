import { Router } from 'express';
import * as bookingController from '../controllers/booking.controller';
import { asyncHandler } from '../middleware/error.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { requireAuth, requireRole } from '../middleware/auth.middleware';
import { requestBookingSchema, confirmPaymentSchema } from '../validation/schemas';

const router = Router();

router.use(requireAuth);

router.post(
  '/',
  requireRole('client'),
  validateBody(requestBookingSchema),
  asyncHandler(bookingController.requestBooking),
);

router.post('/:bookingId/accept', requireRole('provider'), asyncHandler(bookingController.acceptBooking));
router.post('/:bookingId/decline', requireRole('provider'), asyncHandler(bookingController.declineBooking));
router.post('/:bookingId/complete', requireRole('provider'), asyncHandler(bookingController.completeBooking));
router.post(
  '/:bookingId/confirm-payment',
  requireRole('provider'),
  validateBody(confirmPaymentSchema),
  asyncHandler(bookingController.confirmPayment),
);

router.get('/dashboard/provider', requireRole('provider'), asyncHandler(bookingController.providerDashboard));
router.get('/dashboard/client', requireRole('client'), asyncHandler(bookingController.clientDashboard));

export default router;