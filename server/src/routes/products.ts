import { Router } from 'express';
import { ProductController } from '../controllers/productController';
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
router.get('/', ProductController.getAllProducts);
router.get('/search', ProductController.searchProducts);
router.get('/category/:category', ProductController.getProductsByCategory);
router.get('/:id', ProductController.getProductById);

// Admin-only routes
router.post('/', requireAdmin, ProductController.createProduct);
router.put('/:id', requireAdmin, ProductController.updateProduct);
router.delete('/:id', requireAdmin, ProductController.deleteProduct);

export default router;
