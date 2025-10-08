"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = exports.requireAdmin = void 0;
const errorHandler_1 = require("./errorHandler");
const requireAdmin = (req, res, next) => {
    try {
        const adminToken = req.headers['x-admin-token'];
        if (!adminToken) {
            throw new errorHandler_1.UnauthorizedError('Admin token required');
        }
        if (adminToken !== process.env.ADMIN_TOKEN) {
            throw new errorHandler_1.ForbiddenError('Invalid admin token');
        }
        req.admin = {
            id: 'admin-1',
            email: process.env.ADMIN_EMAIL || 'admin@sukhsanchaar.com'
        };
        next();
    }
    catch (error) {
        const response = {
            success: false,
            error: error instanceof Error ? error.message : 'Authentication failed'
        };
        const statusCode = error instanceof Error && 'statusCode' in error
            ? error.statusCode
            : 401;
        res.status(statusCode).json(response);
    }
};
exports.requireAdmin = requireAdmin;
const optionalAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (token) {
            req.user = {
                id: 'user-1',
                email: 'user@example.com'
            };
        }
        next();
    }
    catch (error) {
        next();
    }
};
exports.optionalAuth = optionalAuth;
//# sourceMappingURL=auth.js.map