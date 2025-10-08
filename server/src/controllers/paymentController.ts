import { Request, Response } from 'express';
import { RazorpayService } from '../utils/razorpay';
import { OrderModel } from '../models/Order';
import { ApiResponse } from '../types';
import { ValidationError, NotFoundError, RazorpayError } from '../middleware/errorHandler';
import { NotificationService } from '../utils/notifications';

export class PaymentController {
  /**
   * POST /api/payment/create-order
   * Creates Razorpay order (returns orderId, amount, currency)
   */
  static async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const { amount, currency = 'INR', receipt } = req.body;

      // Validate required fields
      if (!amount || amount <= 0) {
        throw new ValidationError('Valid amount is required');
      }

      // Validate amount range (minimum ₹1, maximum ₹100000)
      if (amount < 1 || amount > 100000) {
        throw new ValidationError('Amount must be between ₹1 and ₹100,000');
      }

      // Create Razorpay order
      const razorpayOrder = await RazorpayService.createOrder(amount, currency, receipt);

      const response: ApiResponse = {
        success: true,
        data: {
          order_id: razorpayOrder.id,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          receipt: razorpayOrder.receipt
        },
        message: 'Razorpay order created successfully'
      };

      res.json(response);
    } catch (error) {
      console.error('Error in createOrder:', error);
      throw error;
    }
  }

  /**
   * POST /api/payment/verify
   * Verifies Razorpay payment signature after checkout
   */
  static async verifyPayment(req: Request, res: Response): Promise<void> {
    try {
      const { 
        razorpay_order_id, 
        razorpay_payment_id, 
        razorpay_signature,
        order_id 
      } = req.body;

      // Validate required fields
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        throw new ValidationError('Razorpay order ID, payment ID, and signature are required');
      }

      // Verify payment signature
      const isSignatureValid = RazorpayService.verifyPaymentSignature(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      );

      if (!isSignatureValid) {
        throw new RazorpayError('Invalid payment signature');
      }

      // Get payment details from Razorpay
      const paymentDetails = await RazorpayService.getPaymentDetails(razorpay_payment_id);
      
      if (!paymentDetails) {
        throw new RazorpayError('Failed to fetch payment details');
      }

      // Verify payment status
      if (paymentDetails.status !== 'captured') {
        throw new RazorpayError(`Payment not captured. Status: ${paymentDetails.status}`);
      }

      // Update order with payment details if order_id is provided
      if (order_id) {
        try {
          const updatedOrder = await OrderModel.updatePaymentDetails(
            order_id,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
          );

          // Send email notifications after successful payment
          try {
            await Promise.all([
              NotificationService.sendOrderConfirmationToCustomer(updatedOrder)
            ]);
          } catch (notificationError) {
            console.error('Error sending email notifications:', notificationError);
            // Don't throw error - payment is still successful
          }
        } catch (error) {
          console.error('Error updating order payment details:', error);
          // Don't throw error here as payment verification is successful
        }
      }

      const response: ApiResponse = {
        success: true,
        data: {
          payment_id: razorpay_payment_id,
          order_id: razorpay_order_id,
          amount: paymentDetails.amount,
          currency: paymentDetails.currency,
          status: paymentDetails.status,
          method: paymentDetails.method
        },
        message: 'Payment verified successfully'
      };

      res.json(response);
    } catch (error) {
      console.error('Error in verifyPayment:', error);
      throw error;
    }
  }

  /**
   * POST /api/payment/webhook
   * Handles Razorpay webhook notifications
   */
  static async handleWebhook(req: Request, res: Response): Promise<void> {
    try {
      const signature = req.headers['x-razorpay-signature'] as string;
      const body = JSON.stringify(req.body);

      // Verify webhook signature
      const isSignatureValid = RazorpayService.verifyWebhookSignature(body, signature);

      if (!isSignatureValid) {
        console.error('Invalid webhook signature');
        res.status(400).json({ success: false, error: 'Invalid webhook signature' });
        return;
      }

      const event = req.body;
      console.log('Razorpay webhook received:', event.event);

      // Handle different webhook events
      switch (event.event) {
        case 'payment.captured':
          await this.handlePaymentCaptured(event);
          break;
        case 'payment.failed':
          await this.handlePaymentFailed(event);
          break;
        case 'order.paid':
          await this.handleOrderPaid(event);
          break;
        default:
          console.log('Unhandled webhook event:', event.event);
      }

      res.json({ success: true, message: 'Webhook processed successfully' });
    } catch (error) {
      console.error('Error in handleWebhook:', error);
      res.status(500).json({ success: false, error: 'Webhook processing failed' });
    }
  }

  /**
   * Handle payment captured webhook
   */
  private static async handlePaymentCaptured(event: any): Promise<void> {
    try {
      const payment = event.payload.payment.entity;
      console.log('Payment captured:', payment.id);

      // Update order status if we can find the order
      // This would require storing the mapping between Razorpay order ID and our order ID
      // For now, just log the event
      console.log('Payment captured for order:', payment.order_id);
    } catch (error) {
      console.error('Error handling payment captured:', error);
    }
  }

  /**
   * Handle payment failed webhook
   */
  private static async handlePaymentFailed(event: any): Promise<void> {
    try {
      const payment = event.payload.payment.entity;
      console.log('Payment failed:', payment.id);

      // Update order status to failed
      // This would require storing the mapping between Razorpay order ID and our order ID
      console.log('Payment failed for order:', payment.order_id);
    } catch (error) {
      console.error('Error handling payment failed:', error);
    }
  }

  /**
   * Handle order paid webhook
   */
  private static async handleOrderPaid(event: any): Promise<void> {
    try {
      const order = event.payload.order.entity;
      console.log('Order paid:', order.id);

      // Update order status to paid
      // This would require storing the mapping between Razorpay order ID and our order ID
      console.log('Order paid:', order.id);
    } catch (error) {
      console.error('Error handling order paid:', error);
    }
  }

  /**
   * POST /api/payment/refund
   * Process refund for a payment (Admin only)
   */
  static async processRefund(req: Request, res: Response): Promise<void> {
    try {
      const { payment_id, amount, reason } = req.body;

      if (!payment_id) {
        throw new ValidationError('Payment ID is required');
      }

      const refund = await RazorpayService.refundPayment(payment_id, amount, reason);

      const response: ApiResponse = {
        success: true,
        data: refund,
        message: 'Refund processed successfully'
      };

      res.json(response);
    } catch (error) {
      console.error('Error in processRefund:', error);
      throw error;
    }
  }
}
