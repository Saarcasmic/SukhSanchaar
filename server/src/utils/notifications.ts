import { Order } from '../types';
import { emailService } from './emailService';

/**
 * Notification service for sending WhatsApp and email notifications
 * Integrates with Gmail API for email notifications
 */
export class NotificationService {
  /**
   * Send order confirmation notification to customer
   */
  static async sendOrderConfirmationToCustomer(order: Order): Promise<void> {
    try {
      await emailService.sendOrderConfirmation(order);
    } catch (error) {
      console.error('Failed to send order confirmation email to customer:', error);
      throw error;
    }
  }

  /**
   * Send order confirmation notification to admin
   */
  static async sendOrderConfirmationToAdmin(order: Order): Promise<void> {
    try {
      // TODO: Implement admin notification template
      // For now, just log the order for admin review
      console.log(`New order ${order.order_number} - Customer: ${order.customer_name}, Amount: ₹${order.total_amount}`);
    } catch (error) {
      console.error('Failed to send order confirmation notification to admin:', error);
      // Don't throw error for admin notification failure
    }
  }

  /**
   * Send shipping update notification to customer
   */
  

  /**
   * Send low stock alert to admin
   */
  

  /**
   * Send daily sales summary to admin
   */
  

  // TODO: Implement WhatsApp notification methods
  /*
  private static async sendWhatsAppMessage(phoneNumber: string, message: string): Promise<void> {
    // Integrate with WhatsApp Business API
    // Example: Twilio, MessageBird, or direct WhatsApp Business API
  }
  */
}
