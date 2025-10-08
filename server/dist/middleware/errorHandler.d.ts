import { Request, Response, NextFunction } from 'express';
export declare const errorHandler: (err: Error, req: Request, res: Response, next: NextFunction) => void;
export declare class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    constructor(message: string, statusCode?: number, isOperational?: boolean);
}
export declare class ValidationError extends AppError {
    constructor(message: string);
}
export declare class UnauthorizedError extends AppError {
    constructor(message?: string);
}
export declare class ForbiddenError extends AppError {
    constructor(message?: string);
}
export declare class NotFoundError extends AppError {
    constructor(message?: string);
}
export declare class ConflictError extends AppError {
    constructor(message?: string);
}
export declare class SupabaseError extends AppError {
    constructor(message: string);
}
export declare class RazorpayError extends AppError {
    constructor(message: string);
}
//# sourceMappingURL=errorHandler.d.ts.map