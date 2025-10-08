import Razorpay from 'razorpay';
import { RazorpayOrder, RazorpayPayment } from '../types';
export declare class RazorpayService {
    private static instance;
    static getInstance(): Razorpay;
    static createOrder(amount: number, currency?: string, receipt?: string): Promise<RazorpayOrder>;
    static verifyPaymentSignature(razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string): boolean;
    static verifyWebhookSignature(body: string, signature: string): boolean;
    static getPaymentDetails(paymentId: string): Promise<RazorpayPayment | null>;
    static refundPayment(paymentId: string, amount?: number, notes?: string): Promise<any>;
    static getOrderDetails(orderId: string): Promise<RazorpayOrder | null>;
}
//# sourceMappingURL=razorpay.d.ts.map