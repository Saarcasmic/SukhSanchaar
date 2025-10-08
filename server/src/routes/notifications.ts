import { Router } from 'express';
import { NotificationController } from '../controllers/notificationController';
import { requireAdmin } from '../middleware/auth';

const router = Router();

/**
 * Notification Routes
 * 
 * POST /api/notifications/order-confirmation - Send order confirmation notification to admin
 * POST /api/notifications/shipping-update - Send shipping update notification to customer
 * POST /api/notifications/low-stock - Send low stock alert to admin (Admin only)
 * POST /api/notifications/daily-summary - Send daily sales summary to admin (Admin only)
 * POST /api/notifications/test - Test notification system (Admin only)
 */

// Public routes
router.post('/order-confirmation', NotificationController.sendOrderConfirmation);


export default router;
