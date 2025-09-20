import { Router } from 'express';
import { OrderController } from '../controllers/orderController';
import { requireAdmin } from '../middleware/auth';

const router = Router();

/**
 * Order Routes
 * 
 * GET /api/orders - Fetch all orders (Admin only)
 * GET /api/orders/:id - Fetch single order (Admin)
 * GET /api/orders/number/:orderNumber - Fetch order by order number
 * POST /api/orders - Create new order (after successful Razorpay payment)
 * PUT /api/orders/:id - Update order status (Admin)
 * PUT /api/orders/:id/payment - Update order payment details
 * DELETE /api/orders/:id - Delete order (Admin)
 */

// Public routes
router.post('/', OrderController.createOrder);
router.get('/number/:orderNumber', OrderController.getOrderByNumber);

// Admin-only routes
router.get('/', requireAdmin, OrderController.getAllOrders);
router.get('/:id', requireAdmin, OrderController.getOrderById);
router.put('/:id', requireAdmin, OrderController.updateOrder);
router.put('/:id/payment', OrderController.updatePaymentDetails);
router.delete('/:id', requireAdmin, OrderController.deleteOrder);

export default router;
