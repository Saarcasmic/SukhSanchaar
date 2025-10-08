"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.requireAdmin);
router.get('/stats', adminController_1.AdminController.getStats);
router.get('/dashboard', adminController_1.AdminController.getDashboard);
exports.default = router;
//# sourceMappingURL=admin.js.map