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

  
}
