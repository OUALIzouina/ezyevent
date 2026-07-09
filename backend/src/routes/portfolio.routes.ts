import { Router } from 'express';
import * as portfolioController from '../controllers/portfolio.controller';
import { asyncHandler } from '../middleware/error.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { requireAuth, requireRole } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';
import { createPortfolioSchema, updatePortfolioSchema } from '../validation/schemas';

const router = Router();

router.use(requireAuth, requireRole('provider'));

router.post('/', validateBody(createPortfolioSchema), asyncHandler(portfolioController.createPortfolio));
router.patch('/:portfolioId', validateBody(updatePortfolioSchema), asyncHandler(portfolioController.updatePortfolio));
router.delete('/:portfolioId', asyncHandler(portfolioController.deletePortfolio));

// multipart/form-data — field name must be "image"
router.post('/:portfolioId/images', upload.single('image'), asyncHandler(portfolioController.uploadImage));
router.delete('/images/:imageId', asyncHandler(portfolioController.deleteImage));

export default router;
