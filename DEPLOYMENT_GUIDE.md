# SukhSanchaar Vercel Deployment Guide

## Overview
This guide will help you deploy your SukhSanchaar monorepo (client + server) to Vercel.

## Prerequisites
1. Vercel account (sign up at vercel.com)
2. GitHub repository with your code
3. All required API keys and credentials

## Step 1: Prepare Your Repository

### 1.1 Push to GitHub
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/sukhsanchaar.git
git branch -M main
git push -u origin main
```

### 1.2 Install Dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

## Step 2: Deploy to Vercel

### 2.1 Connect Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect it as a monorepo

### 2.2 Configure Build Settings

#### For the Root Project (Main Deployment):
- **Framework Preset**: Other
- **Root Directory**: Leave empty (root)
- **Build Command**: `npm run build`
- **Output Directory**: `client/dist`
- **Install Command**: `npm run install:all`

#### For the API (Server):
- **Framework Preset**: Node.js
- **Root Directory**: `server`
- **Build Command**: `npm run build`
- **Output Directory**: Leave empty
- **Install Command**: `npm install`

### 2.3 Environment Variables

Add these environment variables in Vercel Dashboard:

#### Server Environment Variables:
```
NODE_ENV=production
FRONTEND_URL=https://your-app-name.vercel.app
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
JWT_SECRET=your_jwt_secret_key
WHATSAPP_API_URL=your_whatsapp_api_url
GMAIL_CLIENT_ID=your_gmail_client_id
GMAIL_CLIENT_SECRET=your_gmail_client_secret
GMAIL_REFRESH_TOKEN=your_gmail_refresh_token
ADMIN_EMAIL=admin@sukhsanchaar.com
ADMIN_PHONE=+91xxxxxxxxxx
```

#### Client Environment Variables:
```
VITE_API_BASE_URL=https://your-app-name.vercel.app/api
VITE_ADMIN_TOKEN=your_admin_token_here
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id_here
```

## Step 3: Deployment Process

### 3.1 Deploy Frontend
1. In Vercel Dashboard, go to your project
2. Go to "Settings" → "General"
3. Set the following:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3.2 Deploy Backend API
1. Create a new project in Vercel for your API
2. Connect the same repository
3. Set the following:
   - **Framework Preset**: Node.js
   - **Root Directory**: `server`
   - **Build Command**: `npm run build`
   - **Output Directory**: Leave empty

### 3.3 Update API URLs
After deployment, update your client environment variables with the actual API URL:
```
VITE_API_BASE_URL=https://your-api-project.vercel.app/api
```

## Step 4: Domain Configuration

### 4.1 Custom Domain (Optional)
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### 4.2 Update CORS Settings
Update the server CORS configuration with your actual domain:
```typescript
origin: process.env.NODE_ENV === 'production' 
  ? [
      process.env.FRONTEND_URL,
      'https://your-custom-domain.com'
    ] 
  : ['http://localhost:3000', 'http://localhost:5173']
```

## Step 5: Testing Your Deployment

### 5.1 Health Check
Visit: `https://your-api-project.vercel.app/health`

### 5.2 Frontend
Visit: `https://your-frontend-project.vercel.app`

### 5.3 API Endpoints
Test your API endpoints:
- `https://your-api-project.vercel.app/api/products`
- `https://your-api-project.vercel.app/api/orders`

## Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check Node.js version (should be 18+)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **CORS Errors**
   - Update CORS configuration with correct frontend URL
   - Check environment variables

3. **API Not Found**
   - Verify API project is deployed separately
   - Check API URL in frontend environment variables

4. **Environment Variables**
   - Ensure all required variables are set in Vercel
   - Check variable names match exactly

## Production Checklist

- [ ] All environment variables configured
- [ ] CORS settings updated for production domain
- [ ] API endpoints tested
- [ ] Frontend builds successfully
- [ ] Database connections working
- [ ] Payment integration tested
- [ ] Email notifications working
- [ ] Custom domain configured (if applicable)

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify all environment variables
3. Test API endpoints individually
4. Check browser console for frontend errors

## Next Steps After Deployment

1. Set up monitoring and analytics
2. Configure webhooks for payment processing
3. Set up automated backups
4. Implement proper error tracking
5. Set up CI/CD for automatic deployments

