import { Router } from 'express';
import { AdminController } from '../controllers/adminController';
import { requireAdmin } from '../middleware/auth';

const router = Router();

/**
 * Admin Routes
 * 
 * GET /api/admin/stats - Overview of stats (today's orders, total sales, top products)
 * GET /api/admin/dashboard - Extended dashboard data with charts and analytics
 */

// All admin routes require authentication
router.use(requireAdmin);

router.get('/stats', AdminController.getStats);
router.get('/dashboard', AdminController.getDashboard);

export default router;
