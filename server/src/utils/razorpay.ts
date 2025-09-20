import Razorpay from 'razorpay';
import crypto from 'crypto';
import { RazorpayOrder, RazorpayPayment } from '../types';

/**
 * Razorpay configuration and utilities
 */
export class RazorpayService {
  private static instance: Razorpay;

  /**
   * Get Razorpay instance
   */
  static getInstance(): Razorpay {
    if (!this.instance) {
      const keyId = process.env.RAZORPAY_KEY_ID;
      const keySecret = process.env.RAZORPAY_KEY_SECRET;

      if (!keyId || !keySecret) {
        throw new Error('Razorpay credentials not configured');
      }

      this.instance = new Razorpay({
        key_id: keyId,
        key_secret: keySecret
      });
    }

    return this.instance;
  }

  /**
   * Create a Razorpay order
   */
  static async createOrder(amount: number, currency: string = 'INR', receipt?: string): Promise<RazorpayOrder> {
    try {
      const razorpay = this.getInstance();
      
      const options = {
        amount: Math.round(amount * 100), // Convert to paise
        currency,
        receipt: receipt || `receipt_${Date.now()}`,
        notes: {
          source: 'sukhsanchaar_api'
        }
      };

      const order = await razorpay.orders.create(options);
      
      return {
        id: order.id,
        amount: order.amount / 100, // Convert back to rupees
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
        created_at: order.created_at
      };
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw new Error(`Failed to create Razorpay order: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Verify Razorpay payment signature
   */
  static verifyPaymentSignature(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ): boolean {
    try {
      const body = razorpayOrderId + '|' + razorpayPaymentId;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
        .update(body)
        .digest('hex');

      return expectedSignature === razorpaySignature;
    } catch (error) {
      console.error('Error verifying payment signature:', error);
      return false;
    }
  }

  /**
   * Verify Razorpay webhook signature
   */
  static verifyWebhookSignature(body: string, signature: string): boolean {
    try {
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET || '')
        .update(body)
        .digest('hex');

      return expectedSignature === signature;
    } catch (error) {
      console.error('Error verifying webhook signature:', error);
      return false;
    }
  }

  /**
   * Get payment details from Razorpay
   */
  static async getPaymentDetails(paymentId: string): Promise<RazorpayPayment | null> {
    try {
      const razorpay = this.getInstance();
      const payment = await razorpay.payments.fetch(paymentId);
      
      return {
        id: payment.id,
        order_id: payment.order_id,
        amount: payment.amount / 100, // Convert back to rupees
        currency: payment.currency,
        status: payment.status,
        method: payment.method,
        created_at: payment.created_at
      };
    } catch (error) {
      console.error('Error fetching payment details:', error);
      return null;
    }
  }

  /**
   * Refund a payment
   */
  static async refundPayment(paymentId: string, amount?: number, notes?: string): Promise<any> {
    try {
      const razorpay = this.getInstance();
      
      const refundOptions: any = {
        payment_id: paymentId,
        notes: notes || { reason: 'Customer request' }
      };

      if (amount) {
        refundOptions.amount = Math.round(amount * 100); // Convert to paise
      }

      const refund = await razorpay.payments.refund(paymentId, refundOptions);
      return refund;
    } catch (error) {
      console.error('Error processing refund:', error);
      throw new Error(`Failed to process refund: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get order details from Razorpay
   */
  static async getOrderDetails(orderId: string): Promise<RazorpayOrder | null> {
    try {
      const razorpay = this.getInstance();
      const order = await razorpay.orders.fetch(orderId);
      
      return {
        id: order.id,
        amount: order.amount / 100, // Convert back to rupees
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
        created_at: order.created_at
      };
    } catch (error) {
      console.error('Error fetching order details:', error);
      return null;
    }
  }
}
