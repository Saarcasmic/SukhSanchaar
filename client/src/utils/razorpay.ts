import { RazorpayOptions, RazorpayResponse } from "../types/razorpay";

// Razorpay configuration
const RAZORPAY_KEY_ID = (import.meta as any).env?.VITE_RAZORPAY_KEY_ID; // Replace with your actual key

export class RazorpayService {
  /**
   * Initialize Razorpay checkout
   */
  static async openCheckout(
    options: RazorpayOptions,
  ): Promise<RazorpayResponse> {
    return new Promise((resolve, reject) => {
      if (!window.Razorpay) {
        reject(new Error("Razorpay SDK not loaded"));
        return;
      }

      const razorpayOptions = {
        ...options,
        key: RAZORPAY_KEY_ID,
        handler: (response: RazorpayResponse) => {
          resolve(response);
        },
        modal: {
          ondismiss: () => {
            reject(new Error("Payment cancelled by user"));
          },
        },
      };

      const razorpay = new window.Razorpay(razorpayOptions);
      razorpay.open();
    });
  }

  /**
   * Create Razorpay options for checkout
   */
  static createCheckoutOptions(
    orderId: string,
    amount: number,
    currency: string,
    customerName: string,
    customerEmail: string,
    customerPhone: string,
    description: string = "Sukh Sancharak Co. Ayurvedic Products",
  ): RazorpayOptions {
    return {
      key: RAZORPAY_KEY_ID,
      amount: amount, // Amount is already in paise from CheckoutModal
      currency,
      name: "Sukh Sancharak Co.",
      description,
      order_id: orderId,
      prefill: {
        name: customerName,
        email: customerEmail,
        contact: customerPhone,
      },
      notes: {
        source: "sukhsancharak_web",
        order_id: orderId,
      },
      theme: {
        color: "#8B4513", // Antique brown color
      },
      handler: () => {}, // Will be overridden in openCheckout
    };
  }

  /**
   * Check if Razorpay is available
   */
  static isAvailable(): boolean {
    return typeof window !== "undefined" && !!window.Razorpay;
  }
}
