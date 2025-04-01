import { Request, Response, NextFunction } from 'express';
import { AppError, IErrorResponse } from '../types/error.types';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    const errorResponse: IErrorResponse = {
      status: err.status,
      message: err.message,
    };

    return res.status(err.statusCode).json(errorResponse);
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const validationErrors = Object.values((err as any).errors).map(
      (error: any) => ({
        field: error.path,
        message: error.message,
      })
    );

    return res.status(400).json({
      status: 'fail',
      message: 'Validation Error',
      errors: validationErrors,
    });
  }

  // Handle Mongoose duplicate key errors
  if ((err as any).code === 11000) {
    return res.status(409).json({
      status: 'fail',
      message: 'Duplicate field value entered',
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid token. Please log in again!',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'fail',
      message: 'Your token has expired! Please log in again.',
    });
  }

  // Handle other errors
  console.error('Error:', err);

  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}; 