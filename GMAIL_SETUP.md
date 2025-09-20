# Gmail Integration Setup Guide

This guide will help you set up Gmail integration for sending order confirmation emails using two methods:

1. **App Password Method** (Recommended for development - simpler)
2. **OAuth2 Method** (Recommended for production - more secure)

## Prerequisites

- A Google account
- Node.js application with the Gmail service already integrated

## Method 1: App Password (Recommended for Development)

This is the simplest method and works immediately without complex OAuth2 setup.

### Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled
3. Follow the setup process

### Step 2: Generate App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click on **2-Step Verification**
3. Scroll down to **App passwords**
4. Click **App passwords**
5. Select **Mail** as the app
6. Generate a password (it will look like: `abcd efgh ijkl mnop`)
7. **Copy this password** - you'll need it

### Step 3: Configure Environment Variables

Add these variables to your `.env` file:

```env
# Gmail Configuration (App Password Method)
GMAIL_USER_EMAIL=your_gmail_address@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password

# Admin Configuration
ADMIN_EMAIL=your_admin_email@gmail.com
```

### Step 4: Test the Integration

1. Start your server: `npm run dev`
2. Test the Gmail service: `curl http://localhost:3001/api/test/gmail`
3. Check your email for the test message

---

## Method 2: OAuth2 (For Production)

This method is more secure and recommended for production environments.

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: "SukhSanchaar Email Service"
4. Click "Create"

## Step 2: Enable Gmail API

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Gmail API"
3. Click on "Gmail API" and then "Enable"

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - Choose "External" user type
   - Fill in required fields:
     - App name: "SukhSanchaar Email Service"
     - User support email: your email
     - Developer contact: your email
   - Add scopes: `https://www.googleapis.com/auth/gmail.send`
   - Add test users: your email address
4. For Application type, choose "Web application"
5. Add authorized redirect URIs:
   - `https://developers.google.com/oauthplayground`
6. Click "Create"
7. Download the JSON file and note the Client ID and Client Secret

## Step 4: Generate Refresh Token

1. Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Click the gear icon (⚙️) in the top right
3. Check "Use your own OAuth credentials"
4. Enter your Client ID and Client Secret
5. In the left panel, find "Gmail API v1"
6. Select `https://www.googleapis.com/auth/gmail.send`
7. Click "Authorize APIs"
8. Sign in with your Google account and grant permissions
9. Click "Exchange authorization code for tokens"
10. Copy the "Refresh token" value

## Step 5: Configure Environment Variables

Add these variables to your `.env` file:

```env
# Gmail Configuration
GMAIL_CLIENT_ID=your_client_id_from_step_3
GMAIL_CLIENT_SECRET=your_client_secret_from_step_3
GMAIL_REFRESH_TOKEN=your_refresh_token_from_step_4
GMAIL_USER_EMAIL=your_gmail_address@gmail.com

# Admin Configuration
ADMIN_EMAIL=your_admin_email@gmail.com
```

## Step 6: Test the Integration

1. Start your server: `npm run dev`
2. Place a test order through your application
3. Check your email for the order confirmation
4. Check the admin email for the order notification

## Email Templates

The system will send two types of emails:

### Customer Email
- **Subject**: Order Confirmation #[ORDER_NUMBER] - SukhSanchaar
- **Content**: Professional HTML email with order details, items, and shipping address
- **Recipient**: Customer's email address

### Admin Email
- **Subject**: New Order #[ORDER_NUMBER] - SukhSanchaar
- **Content**: Detailed order information with customer details and action items
- **Recipient**: Admin email address (configured in ADMIN_EMAIL)

## Troubleshooting

### Common Issues

1. **"Invalid credentials" error**
   - Verify all environment variables are correct
   - Ensure the refresh token is valid and not expired

2. **"Insufficient permissions" error**
   - Check that Gmail API is enabled
   - Verify the OAuth scope includes `gmail.send`

3. **"User not found" error**
   - Ensure GMAIL_USER_EMAIL is correct
   - Verify the email address has access to the Gmail account

4. **Emails not being sent**
   - Check server logs for error messages
   - Verify the Gmail account has "Less secure app access" enabled (if using personal Gmail)
   - For Gmail accounts with 2FA, use App Passwords instead

### Testing Email Sending

You can test the email functionality by calling the notification service directly:

```javascript
// In your server code
const { NotificationService } = require('./src/utils/notifications');
const { OrderModel } = require('./src/models/Order');

// Get a test order
const testOrder = await OrderModel.getById('your-order-id');

// Send test emails
await NotificationService.sendOrderConfirmationToCustomer(testOrder);
await NotificationService.sendOrderConfirmationToAdmin(testOrder);
```

## Security Notes

- Keep your OAuth credentials secure
- Never commit `.env` files to version control
- Regularly rotate your refresh tokens
- Use environment-specific credentials for different deployments

## Production Considerations

- Set up proper error handling and retry logic
- Monitor email delivery rates
- Consider using a dedicated email service (SendGrid, AWS SES) for high volume
- Implement email templates management system
- Add email delivery status tracking

## Support

If you encounter issues:
1. Check the server logs for detailed error messages
2. Verify all environment variables are set correctly
3. Test with a simple email first before testing the full order flow
4. Ensure your Google Cloud project has proper billing enabled (if required)
