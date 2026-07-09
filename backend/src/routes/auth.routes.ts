import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { asyncHandler } from '../middleware/error.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { requireAuth } from '../middleware/auth.middleware';
import { registerClientSchema, registerProviderSchema, loginSchema } from '../validation/schemas';

const router = Router();


router.post('/register/client', validateBody(registerClientSchema), asyncHandler(authController.registerClient));
router.post('/register/provider', validateBody(registerProviderSchema), asyncHandler(authController.registerProvider));
router.post('/login', validateBody(loginSchema), asyncHandler(authController.login));
router.post('/logout', asyncHandler(authController.logout));
router.get('/me', requireAuth, asyncHandler(authController.me));

export default router;