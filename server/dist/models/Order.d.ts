import { Order, CreateOrderRequest, UpdateOrderRequest, OrderQueryParams, PaginatedResponse } from '../types';
export declare class OrderModel {
    static getAll(queryParams?: OrderQueryParams): Promise<PaginatedResponse<Order>>;
    static getById(id: string): Promise<Order | null>;
    static getByOrderNumber(orderNumber: string): Promise<Order | null>;
    static create(orderData: CreateOrderRequest): Promise<Order>;
    static update(id: string, updateData: UpdateOrderRequest): Promise<Order>;
    static delete(id: string): Promise<boolean>;
    static updatePaymentDetails(orderId: string, razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string): Promise<Order>;
    private static generateOrderNumber;
    private static calculateOrderTotals;
    private static createOrderItems;
    private static updateProductStock;
}
//# sourceMappingURL=Order.d.ts.map