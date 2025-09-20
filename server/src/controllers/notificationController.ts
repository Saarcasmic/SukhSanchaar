import { Request, Response } from 'express';
import { NotificationService } from '../utils/notifications';
import { OrderModel } from '../models/Order';
import { ApiResponse } from '../types';
import { ValidationError, NotFoundError } from '../middleware/errorHandler';

export class NotificationController {
  /**
   * POST /api/notifications/order-confirmation
   * Send order confirmation notification to admin
   */
  static async sendOrderConfirmation(req: Request, res: Response): Promise<void> {
    try {
      const { order_id } = req.body;

      if (!order_id) {
        throw new ValidationError('Order ID is required');
      }

      const order = await OrderModel.getById(order_id);

      if (!order) {
        throw new NotFoundError('Order not found');
      }

      // Send notification to admin
      await NotificationService.sendOrderConfirmationToAdmin(order);

      // Send confirmation to customer
      await NotificationService.sendOrderConfirmationToCustomer(order);

      const response: ApiResponse = {
        success: true,
        message: 'Order confirmation notifications sent successfully'
      };

      res.json(response);
    } catch (error) {
      console.error('Error in sendOrderConfirmation:', error);
      throw error;
    }
  }

  /**
   * POST /api/notifications/shipping-update
   * Send shipping update notification to customer
   */
  static async sendShippingUpdate(req: Request, res: Response): Promise<void> {
    try {
      const { order_id, status } = req.body;

      if (!order_id || !status) {
        throw new ValidationError('Order ID and status are required');
      }

      const validStatuses = ['confirmed', 'shipped', 'delivered', 'cancelled'];
      if (!validStatuses.includes(status)) {
        throw new ValidationError('Invalid status. Must be one of: ' + validStatuses.join(', '));
      }

      const order = await OrderModel.getById(order_id);

      if (!order) {
        throw new NotFoundError('Order not found');
      }

      // Send shipping update notification
      await NotificationService.sendShippingUpdateToCustomer(order, status);

      const response: ApiResponse = {
        success: true,
        message: 'Shipping update notification sent successfully'
      };

      res.json(response);
    } catch (error) {
      console.error('Error in sendShippingUpdate:', error);
      throw error;
    }
  }

  /**
   * POST /api/notifications/low-stock
   * Send low stock alert to admin
   */
  static async sendLowStockAlert(req: Request, res: Response): Promise<void> {
    try {
      const { product_name, current_stock, threshold = 10 } = req.body;

      if (!product_name || current_stock === undefined) {
        throw new ValidationError('Product name and current stock are required');
      }

      if (current_stock < 0) {
        throw new ValidationError('Current stock cannot be negative');
      }

      if (threshold < 0) {
        throw new ValidationError('Threshold cannot be negative');
      }

      await NotificationService.sendLowStockAlert(product_name, current_stock, threshold);

      const response: ApiResponse = {
        success: true,
        message: 'Low stock alert sent successfully'
      };

      res.json(response);
    } catch (error) {
      console.error('Error in sendLowStockAlert:', error);
      throw error;
    }
  }

  /**
   * POST /api/notifications/daily-summary
   * Send daily sales summary to admin
   */
  static async sendDailySummary(req: Request, res: Response): Promise<void> {
    try {
      const { date, total_orders, total_sales, top_products } = req.body;

      if (!date || total_orders === undefined || total_sales === undefined) {
        throw new ValidationError('Date, total orders, and total sales are required');
      }

      if (total_orders < 0 || total_sales < 0) {
        throw new ValidationError('Total orders and sales cannot be negative');
      }

      const salesData = {
        date,
        totalOrders: total_orders,
        totalSales: total_sales,
        topProducts: top_products || []
      };

      await NotificationService.sendDailySalesSummary(salesData);

      const response: ApiResponse = {
        success: true,
        message: 'Daily sales summary sent successfully'
      };

      res.json(response);
    } catch (error) {
      console.error('Error in sendDailySummary:', error);
      throw error;
    }
  }

  /**
   * POST /api/notifications/test
   * Test notification system
   */
  static async testNotification(req: Request, res: Response): Promise<void> {
    try {
      const { type, message } = req.body;

      if (!type || !message) {
        throw new ValidationError('Type and message are required');
      }

      const validTypes = ['whatsapp', 'email', 'both'];
      if (!validTypes.includes(type)) {
        throw new ValidationError('Type must be one of: ' + validTypes.join(', '));
      }

      // Test notification
      console.log(`🧪 Test ${type} notification:`, message);

      const response: ApiResponse = {
        success: true,
        message: `Test ${type} notification sent successfully`,
        data: {
          type,
          message,
          timestamp: new Date().toISOString()
        }
      };

      res.json(response);
    } catch (error) {
      console.error('Error in testNotification:', error);
      throw error;
    }
  }
}
