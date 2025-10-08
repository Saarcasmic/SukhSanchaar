import { Order } from '../types';
export declare class EmailService {
    private transporter;
    constructor();
    private verifyConnection;
    sendOrderConfirmation(order: Order): Promise<void>;
    private generateOrderConfirmationHTML;
}
export declare const emailService: EmailService;
//# sourceMappingURL=emailService.d.ts.map