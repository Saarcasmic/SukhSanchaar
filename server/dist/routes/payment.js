"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/create-order', paymentController_1.PaymentController.createOrder);
router.post('/verify', paymentController_1.PaymentController.verifyPayment);
router.post('/webhook', paymentController_1.PaymentController.handleWebhook);
router.post('/refund', auth_1.requireAdmin, paymentController_1.PaymentController.processRefund);
exports.default = router;
//# sourceMappingURL=payment.js.map