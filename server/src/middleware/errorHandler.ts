import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

/**
 * Global error handling middleware
 * Catches all errors and returns consistent JSON response
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Default error response
  let statusCode = 500;
  let message = 'Internal server error';

  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation error: ' + err.message;
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Unauthorized access';
  } else if (err.name === 'ForbiddenError') {
    statusCode = 403;
    message = 'Forbidden access';
  } else if (err.name === 'NotFoundError') {
    statusCode = 404;
    message = 'Resource not found';
  } else if (err.name === 'ConflictError') {
    statusCode = 409;
    message = 'Resource conflict';
  } else if (err.name === 'SupabaseError') {
    statusCode = 400;
    message = 'Database error: ' + err.message;
  } else if (err.name === 'RazorpayError') {
    statusCode = 400;
    message = 'Payment error: ' + err.message;
  }

  const response: ApiResponse = {
    success: false,
    error: message
  };

  // In development, include stack trace
  if (process.env.NODE_ENV === 'development') {
    (response as any).stack = err.stack;
  }

  res.status(statusCode).json(response);
};

/**
 * Custom error classes for better error handling
 */
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'ValidationError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized access') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden access') {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource conflict') {
    super(message, 409);
    this.name = 'ConflictError';
  }
}

export class SupabaseError extends AppError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'SupabaseError';
  }
}

export class RazorpayError extends AppError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'RazorpayError';
  }
}
