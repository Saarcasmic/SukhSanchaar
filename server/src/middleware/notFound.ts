import { Request, Response } from 'express';
import { ApiResponse } from '../types';

/**
 * 404 Not Found middleware
 * Handles requests to non-existent routes
 */
export const notFound = (req: Request, res: Response): void => {
  const response: ApiResponse = {
    success: false,
    error: `Route ${req.method} ${req.originalUrl} not found`
  };

  res.status(404).json(response);
};
