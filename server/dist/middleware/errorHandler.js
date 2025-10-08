"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RazorpayError = exports.SupabaseError = exports.ConflictError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.ValidationError = exports.AppError = exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error('Error occurred:', {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        timestamp: new Date().toISOString()
    });
    let statusCode = 500;
    let message = 'Internal server error';
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation error: ' + err.message;
    }
    else if (err.name === 'UnauthorizedError') {
        statusCode = 401;
        message = 'Unauthorized access';
    }
    else if (err.name === 'ForbiddenError') {
        statusCode = 403;
        message = 'Forbidden access';
    }
    else if (err.name === 'NotFoundError') {
        statusCode = 404;
        message = 'Resource not found';
    }
    else if (err.name === 'ConflictError') {
        statusCode = 409;
        message = 'Resource conflict';
    }
    else if (err.name === 'SupabaseError') {
        statusCode = 400;
        message = 'Database error: ' + err.message;
    }
    else if (err.name === 'RazorpayError') {
        statusCode = 400;
        message = 'Payment error: ' + err.message;
    }
    const response = {
        success: false,
        error: message
    };
    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack;
    }
    res.status(statusCode).json(response);
};
exports.errorHandler = errorHandler;
class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
class ValidationError extends AppError {
    constructor(message) {
        super(message, 400);
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized access') {
        super(message, 401);
        this.name = 'UnauthorizedError';
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends AppError {
    constructor(message = 'Forbidden access') {
        super(message, 403);
        this.name = 'ForbiddenError';
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
        super(message, 404);
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends AppError {
    constructor(message = 'Resource conflict') {
        super(message, 409);
        this.name = 'ConflictError';
    }
}
exports.ConflictError = ConflictError;
class SupabaseError extends AppError {
    constructor(message) {
        super(message, 400);
        this.name = 'SupabaseError';
    }
}
exports.SupabaseError = SupabaseError;
class RazorpayError extends AppError {
    constructor(message) {
        super(message, 400);
        this.name = 'RazorpayError';
    }
}
exports.RazorpayError = RazorpayError;
//# sourceMappingURL=errorHandler.js.map