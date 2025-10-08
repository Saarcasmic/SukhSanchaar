"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const notifications_1 = require("../utils/notifications");
const Order_1 = require("../models/Order");
const errorHandler_1 = require("../middleware/errorHandler");
class NotificationController {
    static async sendOrderConfirmation(req, res) {
        try {
            const { order_id } = req.body;
            if (!order_id) {
                throw new errorHandler_1.ValidationError('Order ID is required');
            }
            const order = await Order_1.OrderModel.getById(order_id);
            if (!order) {
                throw new errorHandler_1.NotFoundError('Order not found');
            }
            await notifications_1.NotificationService.sendOrderConfirmationToAdmin(order);
            await notifications_1.NotificationService.sendOrderConfirmationToCustomer(order);
            const response = {
                success: true,
                message: 'Order confirmation notifications sent successfully'
            };
            res.json(response);
        }
        catch (error) {
            console.error('Error in sendOrderConfirmation:', error);
            throw error;
        }
    }
}
exports.NotificationController = NotificationController;
//# sourceMappingURL=notificationController.js.map