import { Router } from 'express';
import * as adminController from '../controllers/admin.controller';
import { asyncHandler } from '../middleware/error.middleware';
import { requireAuth, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.use(requireAuth, requireRole('admin'));

router.get('/stats', asyncHandler(adminController.getDashboardStats));
router.get('/users', asyncHandler(adminController.listUsers));
router.get('/events', asyncHandler(adminController.listEvents));
router.get('/bookings', asyncHandler(adminController.listBookings));
router.delete('/users/:userId', asyncHandler(adminController.deleteUser));

export default router;