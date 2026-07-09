import { Router } from 'express';
import * as serviceController from '../controllers/service.controller';
import { asyncHandler } from '../middleware/error.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { requireAuth, requireRole } from '../middleware/auth.middleware';
import { createServiceSchema, updateServiceSchema } from '../validation/schemas';

const router = Router();

router.use(requireAuth, requireRole('provider'));

router.post('/', validateBody(createServiceSchema), asyncHandler(serviceController.createService));
router.patch('/:serviceId', validateBody(updateServiceSchema), asyncHandler(serviceController.updateService));
router.delete('/:serviceId', asyncHandler(serviceController.deleteService));

export default router;
