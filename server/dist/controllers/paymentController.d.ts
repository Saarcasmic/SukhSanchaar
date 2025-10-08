import { Request, Response } from 'express';
export declare class PaymentController {
    static createOrder(req: Request, res: Response): Promise<void>;
    static verifyPayment(req: Request, res: Response): Promise<void>;
    static handleWebhook(req: Request, res: Response): Promise<void>;
    private static handlePaymentCaptured;
    private static handlePaymentFailed;
    private static handleOrderPaid;
    static processRefund(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=paymentController.d.ts.map