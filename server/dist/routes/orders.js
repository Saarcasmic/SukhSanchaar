"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/', orderController_1.OrderController.createOrder);
router.get('/number/:orderNumber', orderController_1.OrderController.getOrderByNumber);
router.get('/', auth_1.requireAdmin, orderController_1.OrderController.getAllOrders);
router.get('/:id', auth_1.requireAdmin, orderController_1.OrderController.getOrderById);
router.put('/:id', auth_1.requireAdmin, orderController_1.OrderController.updateOrder);
router.put('/:id/payment', orderController_1.OrderController.updatePaymentDetails);
router.delete('/:id', auth_1.requireAdmin, orderController_1.OrderController.deleteOrder);
exports.default = router;
//# sourceMappingURL=orders.js.map