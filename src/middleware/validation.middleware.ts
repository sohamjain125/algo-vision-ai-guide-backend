import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError, z } from 'zod';
import { AppError } from '../types/error.types';

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        return res.status(400).json({
          status: 'fail',
          message: 'Validation Error',
          errors: validationErrors,
        });
      }
      next(error);
    }
  };
};

// Common validation schemas
export const schemas = {
  user: {
    register: z.object({
      body: z.object({
        email: z.string().email('Invalid email address'),
        password: z
          .string()
          .min(6, 'Password must be at least 6 characters')
          .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
          ),
        name: z.string().min(2, 'Name must be at least 2 characters'),
      }),
    }),
    login: z.object({
      body: z.object({
        email: z.string().email('Invalid email address'),
        password: z.string().min(1, 'Password is required'),
      }),
    }),
  },
  visualization: {
    create: z.object({
      body: z.object({
        algorithmType: z.enum([
          'sorting',
          'searching',
          'graph',
          'tree',
          'linked-list',
          'stack',
          'queue',
          'heap',
        ]),
        algorithm: z.string(),
        input: z.union([
          z.array(z.number()),
          z.array(z.string()),
          z.record(z.any()),
        ]),
        speed: z.enum(['slow', 'medium', 'fast']).optional(),
      }),
    }),
  },
}; 