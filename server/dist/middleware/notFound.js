"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const notFound = (req, res) => {
    const response = {
        success: false,
        error: `Route ${req.method} ${req.originalUrl} not found`
    };
    res.status(404).json(response);
};
exports.notFound = notFound;
//# sourceMappingURL=notFound.js.map