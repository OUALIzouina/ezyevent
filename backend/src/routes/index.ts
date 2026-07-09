import { Router } from 'express';
import authRoutes from './auth.routes';
import eventRoutes from './event.routes';
import providerRoutes from './provider.routes';
import bookingRoutes from './booking.routes';
import adminRoutes from './admin.routes';
import serviceRoutes from './service.routes';
import portfolioRoutes from './portfolio.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/events', eventRoutes);
router.use('/providers', providerRoutes);
router.use('/bookings', bookingRoutes);
router.use('/admin', adminRoutes);
router.use('/services', serviceRoutes);
router.use('/portfolios', portfolioRoutes);

export default router;
