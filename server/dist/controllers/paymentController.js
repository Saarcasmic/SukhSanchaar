"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const razorpay_1 = require("../utils/razorpay");
const Order_1 = require("../models/Order");
const errorHandler_1 = require("../middleware/errorHandler");
const notifications_1 = require("../utils/notifications");
class PaymentController {
    static async createOrder(req, res) {
        try {
            const { amount, currency = 'INR', receipt } = req.body;
            if (!amount || amount <= 0) {
                throw new errorHandler_1.ValidationError('Valid amount is required');
            }
            if (amount < 1 || amount > 100000) {
                throw new errorHandler_1.ValidationError('Amount must be between ₹1 and ₹100,000');
            }
            const razorpayOrder = await razorpay_1.RazorpayService.createOrder(amount, currency, receipt);
            const response = {
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
        }
        catch (error) {
            console.error('Error in createOrder:', error);
            throw error;
        }
    }
    static async verifyPayment(req, res) {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = req.body;
            if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
                throw new errorHandler_1.ValidationError('Razorpay order ID, payment ID, and signature are required');
            }
            const isSignatureValid = razorpay_1.RazorpayService.verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
            if (!isSignatureValid) {
                throw new errorHandler_1.RazorpayError('Invalid payment signature');
            }
            const paymentDetails = await razorpay_1.RazorpayService.getPaymentDetails(razorpay_payment_id);
            if (!paymentDetails) {
                throw new errorHandler_1.RazorpayError('Failed to fetch payment details');
            }
            if (paymentDetails.status !== 'captured') {
                throw new errorHandler_1.RazorpayError(`Payment not captured. Status: ${paymentDetails.status}`);
            }
            if (order_id) {
                try {
                    const updatedOrder = await Order_1.OrderModel.updatePaymentDetails(order_id, razorpay_order_id, razorpay_payment_id, razorpay_signature);
                    try {
                        await Promise.all([
                            notifications_1.NotificationService.sendOrderConfirmationToCustomer(updatedOrder)
                        ]);
                    }
                    catch (notificationError) {
                        console.error('Error sending email notifications:', notificationError);
                    }
                }
                catch (error) {
                    console.error('Error updating order payment details:', error);
                }
            }
            const response = {
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
        }
        catch (error) {
            console.error('Error in verifyPayment:', error);
            throw error;
        }
    }
    static async handleWebhook(req, res) {
        try {
            const signature = req.headers['x-razorpay-signature'];
            const body = JSON.stringify(req.body);
            const isSignatureValid = razorpay_1.RazorpayService.verifyWebhookSignature(body, signature);
            if (!isSignatureValid) {
                console.error('Invalid webhook signature');
                res.status(400).json({ success: false, error: 'Invalid webhook signature' });
                return;
            }
            const event = req.body;
            console.log('Razorpay webhook received:', event.event);
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
        }
        catch (error) {
            console.error('Error in handleWebhook:', error);
            res.status(500).json({ success: false, error: 'Webhook processing failed' });
        }
    }
    static async handlePaymentCaptured(event) {
        try {
            const payment = event.payload.payment.entity;
            console.log('Payment captured:', payment.id);
            console.log('Payment captured for order:', payment.order_id);
        }
        catch (error) {
            console.error('Error handling payment captured:', error);
        }
    }
    static async handlePaymentFailed(event) {
        try {
            const payment = event.payload.payment.entity;
            console.log('Payment failed:', payment.id);
            console.log('Payment failed for order:', payment.order_id);
        }
        catch (error) {
            console.error('Error handling payment failed:', error);
        }
    }
    static async handleOrderPaid(event) {
        try {
            const order = event.payload.order.entity;
            console.log('Order paid:', order.id);
            console.log('Order paid:', order.id);
        }
        catch (error) {
            console.error('Error handling order paid:', error);
        }
    }
    static async processRefund(req, res) {
        try {
            const { payment_id, amount, reason } = req.body;
            if (!payment_id) {
                throw new errorHandler_1.ValidationError('Payment ID is required');
            }
            const refund = await razorpay_1.RazorpayService.refundPayment(payment_id, amount, reason);
            const response = {
                success: true,
                data: refund,
                message: 'Refund processed successfully'
            };
            res.json(response);
        }
        catch (error) {
            console.error('Error in processRefund:', error);
            throw error;
        }
    }
}
exports.PaymentController = PaymentController;
//# sourceMappingURL=paymentController.js.map