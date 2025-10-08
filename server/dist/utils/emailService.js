"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = exports.EmailService = void 0;
const nodemailer = __importStar(require("nodemailer"));
class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER_EMAIL,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });
        this.verifyConnection();
    }
    async verifyConnection() {
        try {
            await this.transporter.verify();
        }
        catch (error) {
            console.error('Email service connection failed:', error);
            throw new Error('Failed to connect to email service');
        }
    }
    async sendOrderConfirmation(order) {
        try {
            const mailOptions = {
                from: {
                    name: 'SukhSanchaar',
                    address: process.env.GMAIL_USER_EMAIL
                },
                to: [order.customer_email, "agrawalsaar16@gmail.com"],
                subject: `Order Confirmation - ${order.order_number}`,
                html: this.generateOrderConfirmationHTML(order)
            };
            await this.transporter.sendMail(mailOptions);
        }
        catch (error) {
            console.error('Failed to send order confirmation email:', error);
            throw new Error('Failed to send order confirmation email');
        }
    }
    generateOrderConfirmationHTML(order) {
        const formatCurrency = (amount) => `₹${amount.toFixed(2)}`;
        const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation - SukhSanchaar</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Georgia', 'Times New Roman', serif;
                line-height: 1.8;
                color: #1a1a1a;
                background-color: #f5f5f0;
                padding: 40px 20px;
            }
            
            .email-container {
                max-width: 700px;
                margin: 0 auto;
                background-color: #ffffff;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
            }
            
            .header {
                background-color: #f5f1e8;
                padding: 50px 40px;
                border-bottom: 3px solid #d4c5a9;
                text-align: center;
            }
            
            .logo {
                font-family: 'Playfair Display', Georgia, serif;
                font-size: 36px;
                font-weight: 700;
                color: #1a1a1a;
                letter-spacing: 1px;
                margin-bottom: 12px;
            }
            
            .header-subtitle {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                font-size: 14px;
                color: #6b6b6b;
                letter-spacing: 2px;
                text-transform: uppercase;
                font-weight: 400;
            }
            
            .content {
                padding: 50px 40px;
            }
            
            .confirmation-message {
                text-align: center;
                padding: 30px 0;
                border-bottom: 1px solid #e8e8e8;
                margin-bottom: 40px;
            }
            
            .confirmation-message h2 {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                font-size: 24px;
                font-weight: 300;
                color: #1a1a1a;
                margin-bottom: 10px;
            }
            
            .confirmation-message p {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                font-size: 15px;
                color: #6b6b6b;
                line-height: 1.6;
            }
            
            .section {
                margin-bottom: 45px;
            }
            
            .section-title {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                font-size: 16px;
                font-weight: 600;
                color: #1a1a1a;
                text-transform: uppercase;
                letter-spacing: 1.5px;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 2px solid #1a1a1a;
            }
            
            .order-details {
                background-color: #fafaf8;
                padding: 25px;
                border: 1px solid #e8e8e8;
            }
            
            .detail-row {
                display: flex;
                justify-content: space-between;
                padding: 12px 0;
                border-bottom: 1px solid #e8e8e8;
            }
            
            .detail-row:last-child {
                border-bottom: none;
            }
            
            .detail-label {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                font-size: 14px;
                color: #6b6b6b;
                font-weight: 400;
            }
            
            .detail-value {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                font-size: 14px;
                color: #1a1a1a;
                font-weight: 500;
                text-align: right;
            }
            
            .items-table {
                width: 100%;
                border-collapse: collapse;
                border: 1px solid #e8e8e8;
                background-color: #ffffff;
            }
            
            .items-table thead {
                background-color: #1a1a1a;
            }
            
            .items-table th {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                font-size: 12px;
                font-weight: 600;
                color: #ffffff;
                text-transform: uppercase;
                letter-spacing: 1px;
                padding: 16px 12px;
                text-align: left;
                border-right: 1px solid #333333;
            }
            
            .items-table th:last-child {
                border-right: none;
            }
            
            .items-table th.align-center {
                text-align: center;
            }
            
            .items-table th.align-right {
                text-align: right;
            }
            
            .items-table td {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                font-size: 14px;
                color: #1a1a1a;
                padding: 18px 12px;
                border-bottom: 1px solid #e8e8e8;
                border-right: 1px solid #e8e8e8;
            }
            
            .items-table td:last-child {
                border-right: none;
            }
            
            .items-table tbody tr:last-child td {
                border-bottom: none;
            }
            
            .items-table tbody tr:hover {
                background-color: #fafaf8;
            }
            
            .product-name {
                font-weight: 500;
                color: #1a1a1a;
            }
            
            .align-center {
                text-align: center;
            }
            
            .align-right {
                text-align: right;
            }
            
            .totals-section {
                margin-top: 30px;
                padding: 30px;
                background-color: #fafaf8;
                border: 1px solid #e8e8e8;
            }
            
            .total-row {
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                font-family: 'Helvetica Neue', Arial, sans-serif;
            }
            
            .total-row .label {
                font-size: 14px;
                color: #6b6b6b;
            }
            
            .total-row .value {
                font-size: 14px;
                color: #1a1a1a;
                font-weight: 500;
            }
            
            .total-row.grand-total {
                margin-top: 15px;
                padding-top: 15px;
                border-top: 2px solid #1a1a1a;
            }
            
            .total-row.grand-total .label {
                font-size: 16px;
                font-weight: 600;
                color: #1a1a1a;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .total-row.grand-total .value {
                font-size: 18px;
                font-weight: 700;
                color: #1a1a1a;
            }
            
            .address-box {
                padding: 25px;
                background-color: #fafaf8;
                border: 1px solid #e8e8e8;
            }
            
            .address-box p {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                font-size: 14px;
                color: #1a1a1a;
                line-height: 1.8;
                margin: 0;
            }
            
            .address-box strong {
                font-weight: 600;
                color: #1a1a1a;
            }
            
            .footer {
                background-color: #1a1a1a;
                color: #ffffff;
                padding: 50px 40px;
                text-align: center;
            }
            
            .footer h3 {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                font-size: 20px;
                font-weight: 300;
                margin-bottom: 15px;
                letter-spacing: 1px;
            }
            
            .footer p {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                font-size: 14px;
                color: #d4c5a9;
                line-height: 1.8;
                margin: 10px 0;
            }
            
            .footer-divider {
                width: 60px;
                height: 1px;
                background-color: #d4c5a9;
                margin: 30px auto;
            }
            
            .contact-info p {
                font-size: 13px;
                color: #b8b8b8;
                margin: 8px 0;
            }
            
            .contact-info a {
                color: #d4c5a9;
                text-decoration: none;
            }
            
            .contact-info a:hover {
                text-decoration: underline;
            }
            
            /* Responsive Design */
            @media only screen and (max-width: 768px) {
                body {
                    padding: 20px 10px;
                }
                
                .header {
                    padding: 40px 25px;
                }
                
                .logo {
                    font-size: 28px;
                }
                
                .content {
                    padding: 40px 25px;
                }
                
                .confirmation-message h2 {
                    font-size: 20px;
                }
                
                .totals-section {
                    padding: 20px;
                }
                
                .footer {
                    padding: 40px 25px;
                }
            }
            
            @media only screen and (max-width: 600px) {
                .header {
                    padding: 30px 20px;
                }
                
                .logo {
                    font-size: 24px;
                }
                
                .header-subtitle {
                    font-size: 11px;
                }
                
                .content {
                    padding: 30px 20px;
                }
                
                .confirmation-message {
                    padding: 20px 0;
                }
                
                .confirmation-message h2 {
                    font-size: 18px;
                }
                
                .confirmation-message p {
                    font-size: 14px;
                }
                
                .section-title {
                    font-size: 14px;
                }
                
                .order-details,
                .address-box,
                .totals-section {
                    padding: 20px;
                }
                
                /* Mobile table adjustments */
                .items-table {
                    font-size: 13px;
                }
                
                .items-table th,
                .items-table td {
                    padding: 12px 8px;
                    font-size: 12px;
                }
                
                .items-table th {
                    font-size: 10px;
                }
                
                /* Stack table on very small screens */
                @media only screen and (max-width: 480px) {
                    .items-table thead {
                        display: none;
                    }
                    
                    .items-table,
                    .items-table tbody,
                    .items-table tr,
                    .items-table td {
                        display: block;
                        width: 100%;
                    }
                    
                    .items-table tr {
                        margin-bottom: 20px;
                        border: 1px solid #e8e8e8;
                        background-color: #fafaf8;
                    }
                    
                    .items-table td {
                        text-align: right;
                        padding: 12px;
                        border: none;
                        border-bottom: 1px solid #e8e8e8;
                        position: relative;
                        padding-left: 50%;
                    }
                    
                    .items-table td:last-child {
                        border-bottom: none;
                    }
                    
                    .items-table td:before {
                        content: attr(data-label);
                        position: absolute;
                        left: 12px;
                        font-weight: 600;
                        text-transform: uppercase;
                        font-size: 11px;
                        color: #6b6b6b;
                        letter-spacing: 1px;
                    }
                }
                
                .footer {
                    padding: 35px 20px;
                }
                
                .footer h3 {
                    font-size: 18px;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <!-- Header -->
            <div class="header">
                <div class="logo">SukhSanchar</div>
                <div class="header-subtitle">Ayurvedic Wellness</div>
            </div>
            
            <!-- Content -->
            <div class="content">
                <!-- Confirmation Message -->
                <div class="confirmation-message">
                    <h2>Order Confirmed</h2>
                    <p>Thank you for your purchase. Your order has been received and is being processed.</p>
                </div>
                
                <!-- Order Details -->
                <div class="section">
                    <h3 class="section-title">Order Information</h3>
                    <div class="order-details">
                        <div class="detail-row">
                            <span class="detail-label">Order Number</span>
                            <span class="detail-value">${order.order_number}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Order Date</span>
                            <span class="detail-value">${formatDate(order.created_at)}</span>
                        </div>
                    </div>
                </div>
                
                <!-- Order Items -->
                <div class="section">
                    <h3 class="section-title">Order Items</h3>
                    <table class="items-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th class="align-center">Quantity</th>
                                <th class="align-right">Unit Price</th>
                                <th class="align-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${order.items.map(item => `
                                <tr>
                                    <td data-label="Product" class="product-name">${item.product_name}</td>
                                    <td data-label="Quantity" class="align-center">${item.quantity}</td>
                                    <td data-label="Unit Price" class="align-right">${formatCurrency(item.unit_price)}</td>
                                    <td data-label="Total" class="align-right">${formatCurrency(item.total_price)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    
                    
                </div>
                
                <!-- Shipping Address -->
                <div class="section">
                    <h3 class="section-title">Shipping Address</h3>
                    <div class="address-box">
                        <p><strong>${order.customer_name}</strong></p>
                        <p>${order.shipping_address.street}</p>
                        <p>${order.shipping_address.city}, ${order.shipping_address.state} ${order.shipping_address.pincode}</p>
                        <p>${order.shipping_address.country}</p>
                        <p><strong>Phone:</strong> ${order.customer_phone}</p>
                    </div>
                </div>
            </div>
            
            <!-- Footer -->
            <div class="footer">
                <h3>Thank You for Your Order</h3>
                <p>We appreciate your business and trust in our Ayurvedic products.</p>
                <p>You will receive a shipping confirmation with tracking details shortly.</p>
                
                <div class="footer-divider"></div>
                
                <div class="contact-info">
                    <p><strong>Questions? Contact Us</strong></p>
                    <p>Email: <a href="mailto:${process.env.ADMIN_EMAIL || 'support@sukhsanchaar.com'}">${process.env.ADMIN_EMAIL || 'support@sukhsanchaar.com'}</a></p>
                    <p>Phone: ${process.env.ADMIN_PHONE || '+91-XXXXXXXXXX'}</p>
                    <p><a href="https://sukhsanchaar.com">www.sukhsanchaar.com</a></p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
    }
}
exports.EmailService = EmailService;
exports.emailService = new EmailService();
//# sourceMappingURL=emailService.js.map