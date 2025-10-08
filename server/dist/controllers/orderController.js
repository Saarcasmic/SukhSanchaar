"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const Order_1 = require("../models/Order");
const errorHandler_1 = require("../middleware/errorHandler");
class OrderController {
    static async getAllOrders(req, res) {
        try {
            const queryParams = {
                page: parseInt(req.query.page) || 1,
                limit: parseInt(req.query.limit) || 10,
                status: req.query.status,
                payment_status: req.query.payment_status,
                customer_email: req.query.customer_email,
                date_from: req.query.date_from,
                date_to: req.query.date_to
            };
            if (queryParams.page && queryParams.page < 1) {
                throw new errorHandler_1.ValidationError('Page number must be greater than 0');
            }
            if (queryParams.limit && (queryParams.limit < 1 || queryParams.limit > 100)) {
                throw new errorHandler_1.ValidationError('Limit must be between 1 and 100');
            }
            const result = await Order_1.OrderModel.getAll(queryParams);
            const response = {
                success: true,
                data: result
            };
            res.json(response);
        }
        catch (error) {
            console.error('Error in getAllOrders:', error);
            throw error;
        }
    }
    static async getOrderById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                throw new errorHandler_1.ValidationError('Order ID is required');
            }
            const order = await Order_1.OrderModel.getById(id);
            if (!order) {
                throw new errorHandler_1.NotFoundError('Order not found');
            }
            const response = {
                success: true,
                data: order
            };
            res.json(response);
        }
        catch (error) {
            console.error('Error in getOrderById:', error);
            throw error;
        }
    }
    static async getOrderByNumber(req, res) {
        try {
            const { orderNumber } = req.params;
            if (!orderNumber) {
                throw new errorHandler_1.ValidationError('Order number is required');
            }
            const order = await Order_1.OrderModel.getByOrderNumber(orderNumber);
            if (!order) {
                throw new errorHandler_1.NotFoundError('Order not found');
            }
            const response = {
                success: true,
                data: order
            };
            res.json(response);
        }
        catch (error) {
            console.error('Error in getOrderByNumber:', error);
            throw error;
        }
    }
    static async createOrder(req, res) {
        try {
            const orderData = req.body;
            const requiredFields = ['customer_name', 'customer_email', 'customer_phone', 'shipping_address', 'items'];
            for (const field of requiredFields) {
                if (!orderData[field]) {
                    throw new errorHandler_1.ValidationError(`${field} is required`);
                }
            }
            if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
                throw new errorHandler_1.ValidationError('Order must contain at least one item');
            }
            for (const item of orderData.items) {
                if (!item.product_id || !item.quantity) {
                    throw new errorHandler_1.ValidationError('Each item must have product_id and quantity');
                }
                if (item.quantity <= 0) {
                    throw new errorHandler_1.ValidationError('Item quantity must be greater than 0');
                }
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(orderData.customer_email)) {
                throw new errorHandler_1.ValidationError('Invalid email format');
            }
            const phone = orderData.customer_phone.replace(/\s/g, '');
            const phoneRegex = /^(\+\d{1,4})?\d{10}$/;
            if (!phoneRegex.test(phone)) {
                throw new errorHandler_1.ValidationError('Invalid phone number format');
            }
            const order = await Order_1.OrderModel.create(orderData);
            const response = {
                success: true,
                data: order,
                message: 'Order created successfully'
            };
            res.status(201).json(response);
        }
        catch (error) {
            console.error('Error in createOrder:', error);
            throw error;
        }
    }
    static async updateOrder(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            if (!id) {
                throw new errorHandler_1.ValidationError('Order ID is required');
            }
            if (updateData.order_status) {
                const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
                if (!validStatuses.includes(updateData.order_status)) {
                    throw new errorHandler_1.ValidationError('Invalid order status');
                }
            }
            if (updateData.payment_status) {
                const validPaymentStatuses = ['pending', 'paid', 'failed', 'refunded'];
                if (!validPaymentStatuses.includes(updateData.payment_status)) {
                    throw new errorHandler_1.ValidationError('Invalid payment status');
                }
            }
            const order = await Order_1.OrderModel.update(id, updateData);
            const response = {
                success: true,
                data: order,
                message: 'Order updated successfully'
            };
            res.json(response);
        }
        catch (error) {
            console.error('Error in updateOrder:', error);
            throw error;
        }
    }
    static async deleteOrder(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                throw new errorHandler_1.ValidationError('Order ID is required');
            }
            const existingOrder = await Order_1.OrderModel.getById(id);
            if (!existingOrder) {
                throw new errorHandler_1.NotFoundError('Order not found');
            }
            await Order_1.OrderModel.delete(id);
            const response = {
                success: true,
                message: 'Order deleted successfully'
            };
            res.json(response);
        }
        catch (error) {
            console.error('Error in deleteOrder:', error);
            throw error;
        }
    }
    static async updatePaymentDetails(req, res) {
        try {
            const { id } = req.params;
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
            if (!id) {
                throw new errorHandler_1.ValidationError('Order ID is required');
            }
            if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
                throw new errorHandler_1.ValidationError('Razorpay order ID, payment ID, and signature are required');
            }
            const order = await Order_1.OrderModel.updatePaymentDetails(id, razorpay_order_id, razorpay_payment_id, razorpay_signature);
            const response = {
                success: true,
                data: order,
                message: 'Payment details updated successfully'
            };
            res.json(response);
        }
        catch (error) {
            console.error('Error in updatePaymentDetails:', error);
            throw error;
        }
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=orderController.js.map