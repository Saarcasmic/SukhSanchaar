import { Router } from 'express';
import { PaymentController } from '../controllers/paymentController';
import { requireAdmin } from '../middleware/auth';

const router = Router();

/**
 * Payment Routes
 * 
 * POST /api/payment/create-order - Creates Razorpay order (returns orderId, amount, currency)
 * POST /api/payment/verify - Verifies Razorpay payment signature after checkout
 * POST /api/payment/webhook - Handles Razorpay webhook notifications
 * POST /api/payment/refund - Process refund for a payment (Admin only)
 */

// Public routes
router.post('/create-order', PaymentController.createOrder);
router.post('/verify', PaymentController.verifyPayment);
router.post('/webhook', PaymentController.handleWebhook);

// Admin-only routes
router.post('/refund', requireAdmin, PaymentController.processRefund);

export default router;
