"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const emailService_1 = require("./emailService");
class NotificationService {
    static async sendOrderConfirmationToCustomer(order) {
        try {
            await emailService_1.emailService.sendOrderConfirmation(order);
        }
        catch (error) {
            console.error('Failed to send order confirmation email to customer:', error);
            throw error;
        }
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=notifications.js.map