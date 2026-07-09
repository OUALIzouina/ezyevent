import { Router } from 'express';
import * as eventController from '../controllers/event.controller';
import { asyncHandler } from '../middleware/error.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { requireAuth, requireRole } from '../middleware/auth.middleware';
import { createEventSchema } from '../validation/schemas';

const router = Router();

router.use(requireAuth, requireRole('client'));

router.post('/', validateBody(createEventSchema), asyncHandler(eventController.createEvent));
router.get('/mine', asyncHandler(eventController.getMyEvents));

export default router;