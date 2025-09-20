import { Request, Response } from 'express';
import { OrderModel } from '../models/Order';
import { ApiResponse, CreateOrderRequest, UpdateOrderRequest, OrderQueryParams } from '../types';
import { ValidationError, NotFoundError } from '../middleware/errorHandler';

export class OrderController {
  /**
   * GET /api/orders
   * Fetch all orders (Admin only)
   */
  static async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const queryParams: OrderQueryParams = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
        status: req.query.status as string,
        payment_status: req.query.payment_status as string,
        customer_email: req.query.customer_email as string,
        date_from: req.query.date_from as string,
        date_to: req.query.date_to as string
      };

      // Validate pagination parameters
      if (queryParams.page && queryParams.page < 1) {
        throw new ValidationError('Page number must be greater than 0');
      }
      if (queryParams.limit && (queryParams.limit < 1 || queryParams.limit > 100)) {
        throw new ValidationError('Limit must be between 1 and 100');
      }

      const result = await OrderModel.getAll(queryParams);

      const response: ApiResponse = {
        success: true,
        data: result
      };

      res.json(response);
    } catch (error) {
      console.error('Error in getAllOrders:', error);
      throw error;
    }
  }

  /**
   * GET /api/orders/:id
   * Fetch single order (Admin)
   */
  static async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        throw new ValidationError('Order ID is required');
      }

      const order = await OrderModel.getById(id);

      if (!order) {
        throw new NotFoundError('Order not found');
      }

      const response: ApiResponse = {
        success: true,
        data: order
      };

      res.json(response);
    } catch (error) {
      console.error('Error in getOrderById:', error);
      throw error;
    }
  }

  /**
   * GET /api/orders/number/:orderNumber
   * Fetch order by order number
   */
  static async getOrderByNumber(req: Request, res: Response): Promise<void> {
    try {
      const { orderNumber } = req.params;

      if (!orderNumber) {
        throw new ValidationError('Order number is required');
      }

      const order = await OrderModel.getByOrderNumber(orderNumber);

      if (!order) {
        throw new NotFoundError('Order not found');
      }

      const response: ApiResponse = {
        success: true,
        data: order
      };

      res.json(response);
    } catch (error) {
      console.error('Error in getOrderByNumber:', error);
      throw error;
    }
  }

  /**
   * POST /api/orders
   * Create new order (after successful Razorpay payment)
   */
  static async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderData: CreateOrderRequest = req.body;

      // Validate required fields
      const requiredFields = ['customer_name', 'customer_email', 'customer_phone', 'shipping_address', 'items'];
      for (const field of requiredFields) {
        if (!orderData[field as keyof CreateOrderRequest]) {
          throw new ValidationError(`${field} is required`);
        }
      }

      // Validate items
      if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
        throw new ValidationError('Order must contain at least one item');
      }

      // Validate each item
      for (const item of orderData.items) {
        if (!item.product_id || !item.quantity) {
          throw new ValidationError('Each item must have product_id and quantity');
        }
        if (item.quantity <= 0) {
          throw new ValidationError('Item quantity must be greater than 0');
        }
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(orderData.customer_email)) {
        throw new ValidationError('Invalid email format');
      }

      // Validate phone format (basic validation)
      // Accepts either "+{countrycode} {10 digit number}" or any 10 digit number
      const phone = orderData.customer_phone.replace(/\s/g, '');
      const phoneRegex = /^(\+\d{1,4})?\d{10}$/;
      if (!phoneRegex.test(phone)) {
        throw new ValidationError('Invalid phone number format');
      }

      const order = await OrderModel.create(orderData);

      const response: ApiResponse = {
        success: true,
        data: order,
        message: 'Order created successfully'
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Error in createOrder:', error);
      throw error;
    }
  }

  /**
   * PUT /api/orders/:id
   * Update order status (Admin)
   */
  static async updateOrder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: UpdateOrderRequest = req.body;

      if (!id) {
        throw new ValidationError('Order ID is required');
      }

      // Validate order status if provided
      if (updateData.order_status) {
        const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(updateData.order_status)) {
          throw new ValidationError('Invalid order status');
        }
      }

      // Validate payment status if provided
      if (updateData.payment_status) {
        const validPaymentStatuses = ['pending', 'paid', 'failed', 'refunded'];
        if (!validPaymentStatuses.includes(updateData.payment_status)) {
          throw new ValidationError('Invalid payment status');
        }
      }

      const order = await OrderModel.update(id, updateData);

      const response: ApiResponse = {
        success: true,
        data: order,
        message: 'Order updated successfully'
      };

      res.json(response);
    } catch (error) {
      console.error('Error in updateOrder:', error);
      throw error;
    }
  }

  /**
   * DELETE /api/orders/:id
   * Delete order (Admin)
   */
  static async deleteOrder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        throw new ValidationError('Order ID is required');
      }

      // Check if order exists before deleting
      const existingOrder = await OrderModel.getById(id);
      if (!existingOrder) {
        throw new NotFoundError('Order not found');
      }

      await OrderModel.delete(id);

      const response: ApiResponse = {
        success: true,
        message: 'Order deleted successfully'
      };

      res.json(response);
    } catch (error) {
      console.error('Error in deleteOrder:', error);
      throw error;
    }
  }

  /**
   * PUT /api/orders/:id/payment
   * Update order payment details
   */
  static async updatePaymentDetails(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

      if (!id) {
        throw new ValidationError('Order ID is required');
      }

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        throw new ValidationError('Razorpay order ID, payment ID, and signature are required');
      }

      const order = await OrderModel.updatePaymentDetails(
        id,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      );

      const response: ApiResponse = {
        success: true,
        data: order,
        message: 'Payment details updated successfully'
      };

      res.json(response);
    } catch (error) {
      console.error('Error in updatePaymentDetails:', error);
      throw error;
    }
  }
}
