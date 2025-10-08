"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RazorpayService = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
class RazorpayService {
    static getInstance() {
        if (!this.instance) {
            const keyId = process.env.RAZORPAY_KEY_ID;
            const keySecret = process.env.RAZORPAY_KEY_SECRET;
            if (!keyId || !keySecret) {
                throw new Error('Razorpay credentials not configured');
            }
            this.instance = new razorpay_1.default({
                key_id: keyId,
                key_secret: keySecret
            });
        }
        return this.instance;
    }
    static async createOrder(amount, currency = 'INR', receipt) {
        try {
            const razorpay = this.getInstance();
            const options = {
                amount: Math.round(amount * 100),
                currency,
                receipt: receipt || `receipt_${Date.now()}`,
                notes: {
                    source: 'sukhsanchaar_api'
                }
            };
            const order = await razorpay.orders.create(options);
            return {
                id: order.id,
                amount: order.amount / 100,
                currency: order.currency,
                receipt: order.receipt,
                status: order.status,
                created_at: order.created_at
            };
        }
        catch (error) {
            console.error('Error creating Razorpay order:', error);
            throw new Error(`Failed to create Razorpay order: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    static verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature) {
        try {
            const body = razorpayOrderId + '|' + razorpayPaymentId;
            const expectedSignature = crypto_1.default
                .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
                .update(body)
                .digest('hex');
            return expectedSignature === razorpaySignature;
        }
        catch (error) {
            console.error('Error verifying payment signature:', error);
            return false;
        }
    }
    static verifyWebhookSignature(body, signature) {
        try {
            const expectedSignature = crypto_1.default
                .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET || '')
                .update(body)
                .digest('hex');
            return expectedSignature === signature;
        }
        catch (error) {
            console.error('Error verifying webhook signature:', error);
            return false;
        }
    }
    static async getPaymentDetails(paymentId) {
        try {
            const razorpay = this.getInstance();
            const payment = await razorpay.payments.fetch(paymentId);
            return {
                id: payment.id,
                order_id: payment.order_id,
                amount: payment.amount / 100,
                currency: payment.currency,
                status: payment.status,
                method: payment.method,
                created_at: payment.created_at
            };
        }
        catch (error) {
            console.error('Error fetching payment details:', error);
            return null;
        }
    }
    static async refundPayment(paymentId, amount, notes) {
        try {
            const razorpay = this.getInstance();
            const refundOptions = {
                payment_id: paymentId,
                notes: notes || { reason: 'Customer request' }
            };
            if (amount) {
                refundOptions.amount = Math.round(amount * 100);
            }
            const refund = await razorpay.payments.refund(paymentId, refundOptions);
            return refund;
        }
        catch (error) {
            console.error('Error processing refund:', error);
            throw new Error(`Failed to process refund: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    static async getOrderDetails(orderId) {
        try {
            const razorpay = this.getInstance();
            const order = await razorpay.orders.fetch(orderId);
            return {
                id: order.id,
                amount: order.amount / 100,
                currency: order.currency,
                receipt: order.receipt,
                status: order.status,
                created_at: order.created_at
            };
        }
        catch (error) {
            console.error('Error fetching order details:', error);
            return null;
        }
    }
}
exports.RazorpayService = RazorpayService;
//# sourceMappingURL=razorpay.js.map