import { Router } from 'express';
import * as providerController from '../controllers/provider.controller';
import { asyncHandler } from '../middleware/error.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { requireAuth, requireRole } from '../middleware/auth.middleware';
import { updateProviderProfileSchema } from '../validation/schemas';

const router = Router();

// IMPORTANT: /me must be registered before /:providerId, otherwise Express
// would match "me" as a providerId param and 404/error on the getProviderProfile lookup.
router.patch(
  '/me',
  requireAuth,
  requireRole('provider'),
  validateBody(updateProviderProfileSchema),
  asyncHandler(providerController.updateMyProfile),
);

// Public browsing — no auth required
router.get('/', asyncHandler(providerController.listProviders));
router.get('/:providerId', asyncHandler(providerController.getProviderProfile));

// Contact details require a confirmed booking, gated to logged-in clients
router.get(
  '/:providerId/contact',
  requireAuth,
  requireRole('client'),
  asyncHandler(providerController.getContactDetails),
);

export default router;
