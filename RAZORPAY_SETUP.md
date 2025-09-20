# Razorpay Payment Integration Setup

## Overview
This project now includes complete Razorpay payment integration for the checkout process. The integration includes:

- **Frontend**: Razorpay checkout modal with payment processing
- **Backend**: Payment order creation and verification APIs
- **State Management**: Payment states managed through CartContext

## Setup Instructions

### 1. Backend Configuration

1. **Environment Variables** (server/.env):
```bash
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

2. **Install Dependencies** (if not already installed):
```bash
cd server
npm install razorpay
```

### 2. Frontend Configuration

1. **Environment Variables** (client/.env):
```bash
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

2. **Razorpay Script**: Already added to `client/index.html`

### 3. API Endpoints

The following endpoints are available:

- `POST /api/payment/create-order` - Creates Razorpay order
- `POST /api/payment/verify` - Verifies payment signature
- `POST /api/payment/webhook` - Handles Razorpay webhooks
- `POST /api/payment/refund` - Processes refunds (Admin only)

### 4. Usage

#### In Components:
```typescript
import { useCart } from '../contexts/CartContext';

const { createRazorpayOrder, processPayment, state } = useCart();

// Create order
const paymentData = await createRazorpayOrder(customerDetails);

// Process payment (after Razorpay checkout)
const verification = await processPayment(razorpayResponse);
```

#### Payment States:
- `state.paymentLoading` - Loading state during payment processing
- `state.paymentError` - Error message if payment fails
- `state.currentOrder` - Current payment order data

### 5. Payment Flow

1. **User clicks "Pay with Razorpay"**
2. **Create Order**: Frontend calls backend to create Razorpay order
3. **Open Checkout**: Razorpay checkout modal opens
4. **Payment Processing**: User completes payment
5. **Verify Payment**: Backend verifies payment signature
6. **Success**: Order is created and cart is cleared
7. **Redirect**: User is redirected to success page

### 6. Error Handling

- Payment cancellation by user
- Network errors during order creation
- Payment verification failures
- Invalid payment signatures

### 7. Security Features

- Payment signature verification
- Webhook signature validation
- Secure API endpoints
- Environment variable protection

### 8. Testing

For testing, use Razorpay test mode:
- Use test key IDs (rzp_test_...)
- Test cards: 4111 1111 1111 1111
- Test UPI: any valid UPI ID
- Test wallets: any valid wallet

### 9. Production Deployment

1. Replace test keys with live keys
2. Configure webhook URLs
3. Set up proper error monitoring
4. Test with real payment methods

## Files Modified/Created

### New Files:
- `client/src/types/razorpay.ts` - Razorpay TypeScript types
- `client/src/utils/razorpay.ts` - Razorpay utility functions
- `RAZORPAY_SETUP.md` - This setup guide

### Modified Files:
- `client/index.html` - Added Razorpay script
- `client/src/contexts/CartContext.tsx` - Added payment functions
- `client/src/components/CheckoutModal.tsx` - Integrated Razorpay checkout
- `client/env.example` - Added Razorpay environment variable

### Backend Files (Already existed):
- `server/src/utils/razorpay.ts` - Razorpay service utilities
- `server/src/controllers/paymentController.ts` - Payment API controllers
- `server/src/routes/payment.ts` - Payment routes

## Support

For issues with Razorpay integration:
1. Check browser console for errors
2. Verify environment variables are set correctly
3. Ensure Razorpay keys are valid
4. Check network connectivity to Razorpay APIs
