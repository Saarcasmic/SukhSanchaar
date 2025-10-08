import { Request, Response } from 'express';
export declare class OrderController {
    static getAllOrders(req: Request, res: Response): Promise<void>;
    static getOrderById(req: Request, res: Response): Promise<void>;
    static getOrderByNumber(req: Request, res: Response): Promise<void>;
    static createOrder(req: Request, res: Response): Promise<void>;
    static updateOrder(req: Request, res: Response): Promise<void>;
    static deleteOrder(req: Request, res: Response): Promise<void>;
    static updatePaymentDetails(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=orderController.d.ts.map