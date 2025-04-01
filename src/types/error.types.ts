export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export interface IErrorResponse {
  status: string;
  message: string;
  errors?: any[];
  stack?: string;
}

export enum ErrorType {
  VALIDATION_ERROR = 'ValidationError',
  AUTHENTICATION_ERROR = 'AuthenticationError',
  AUTHORIZATION_ERROR = 'AuthorizationError',
  NOT_FOUND_ERROR = 'NotFoundError',
  CONFLICT_ERROR = 'ConflictError',
  INTERNAL_SERVER_ERROR = 'InternalServerError'
}

export interface IValidationError {
  field: string;
  message: string;
} 