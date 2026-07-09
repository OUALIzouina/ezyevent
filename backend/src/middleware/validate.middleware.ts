import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    req.body = schema.parse(req.body); // throws ZodError -> caught by asyncHandler/errorHandler
    next();
  };
}