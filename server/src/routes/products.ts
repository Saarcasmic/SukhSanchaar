import { Router } from 'express';
import { SimpleProductController } from '../controllers/simpleProductController';
import { requireAdmin } from '../middleware/auth';

const router = Router();

/**
 * Product Routes
 * 
 * GET /api/products - Fetch all products (with pagination, filters, sorting)
 * GET /api/products/:id - Fetch single product details
 * POST /api/products - Add new product (Admin only)
 * PUT /api/products/:id - Update product details (Admin only)
 * DELETE /api/products/:id - Delete product (Admin only)
 * GET /api/products/category/:category - Get products by category
 * GET /api/products/search - Search products
 */

// Public routes
router.get('/', SimpleProductController.getAllProducts);

// Admin-only routes
router.post('/', requireAdmin, SimpleProductController.createProduct);
router.put('/:id', requireAdmin, SimpleProductController.updateProduct);
router.delete('/:id', requireAdmin, SimpleProductController.deleteProduct);

export default router;
