# Admin Dashboard Setup Guide

## 🚀 Quick Setup

### 1. Backend Setup
```bash
cd server
npm install
cp env.example .env
# Update .env with your Supabase credentials
npm run dev
```

### 2. Frontend Setup
```bash
cd client
npm install
cp env.example .env
# Update .env with your admin token
npm run dev
```

### 3. Environment Variables

#### Backend (.env)
```env
PORT=3001
NODE_ENV=development
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ADMIN_TOKEN=your_admin_token_here
```

#### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_ADMIN_TOKEN=your_admin_token_here
```

## 🔧 Testing the Admin Dashboard

### 1. Start Both Servers
- Backend: `http://localhost:3001`
- Frontend: `http://localhost:5173`

### 2. Access Admin Dashboard
Navigate to the admin dashboard in your frontend application.

### 3. Test Product Management

#### Add Product
1. Click "Add Product" button
2. Fill in required fields:
   - Product Name: "Sudha Sindhu"
   - Description: "Premium Ayurvedic blend..."
   - Price: 220
   - Category: "Syrup"
   - Weight: "10ml"
   - Stock Quantity: 100
3. Click "Add Product"

#### Edit Product
1. Click "Edit" button on any product
2. Modify the fields
3. Click "Update Product"

#### Delete Product
1. Click "Delete" button on any product
2. Confirm deletion

## 📝 API Endpoints Used

- `GET /api/products` - Fetch all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## 🔍 Troubleshooting

### Common Issues

1. **CORS Error**: Make sure backend is running on port 3001
2. **401 Unauthorized**: Check admin token in environment variables
3. **404 Not Found**: Verify API endpoints are correct
4. **Database Error**: Check Supabase credentials and table setup

### Debug Steps

1. Check browser console for errors
2. Check network tab for API calls
3. Verify backend logs
4. Test API endpoints with Postman

## 🎯 Features Implemented

✅ **Product CRUD Operations**
- Create new products with full details
- Edit existing products
- Delete products with confirmation
- View all products in grid layout

✅ **Backend Integration**
- Real API calls to backend
- Proper error handling
- Loading states
- Success/error notifications

✅ **Enhanced Product Form**
- All required fields from backend schema
- Category selection
- Image URL support
- Ingredients and benefits
- Stock management
- Expiry date support

✅ **UI/UX Improvements**
- Loading spinners
- Error messages
- Empty states
- Responsive design
- Form validation

## 🚀 Next Steps

1. Set up proper authentication system
2. Add order management integration
3. Implement file upload for images
4. Add bulk operations
5. Implement search and filtering
