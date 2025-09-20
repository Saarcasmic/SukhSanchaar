# SukhSanchaar Backend API

Backend API for SukhSanchaar Ayurvedic e-commerce website built with Node.js, Express, and Supabase.

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Payment**: Razorpay
- **Language**: TypeScript
- **Environment**: dotenv

## 📁 Project Structure

```
server/
├── src/
│   ├── controllers/          # Business logic controllers
│   │   ├── adminController.ts
│   │   ├── notificationController.ts
│   │   ├── orderController.ts
│   │   └── productController.ts
│   ├── middleware/           # Custom middleware
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   └── notFound.ts
│   ├── models/              # Database models and Supabase client
│   │   ├── database.types.ts
│   │   ├── Order.ts
│   │   ├── Product.ts
│   │   └── supabase.ts
│   ├── routes/              # API route definitions
│   │   ├── admin.ts
│   │   ├── notifications.ts
│   │   ├── orders.ts
│   │   ├── payment.ts
│   │   └── products.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   │   ├── notifications.ts
│   │   └── razorpay.ts
│   └── index.ts             # Application entry point
├── package.json
├── tsconfig.json
└── env.example
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure your variables:

```bash
cp env.example .env
```

Update the `.env` file with your actual values:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret

# JWT Configuration (for future auth implementation)
JWT_SECRET=your_jwt_secret_key

# Notification Configuration (for future implementation)
WHATSAPP_API_URL=your_whatsapp_api_url
EMAIL_SERVICE_API_KEY=your_email_service_api_key

# Admin Configuration
ADMIN_EMAIL=admin@sukhsanchaar.com
ADMIN_PHONE=+91xxxxxxxxxx
ADMIN_TOKEN=your_admin_token_for_testing
```

### 3. Database Setup

Create the following tables in your Supabase database:

#### Products Table
```sql
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  category VARCHAR(100) NOT NULL,
  image_url TEXT NOT NULL,
  images TEXT[],
  ingredients TEXT[] NOT NULL,
  benefits TEXT[] NOT NULL,
  usage_instructions TEXT NOT NULL,
  weight VARCHAR(50) NOT NULL,
  expiry_date DATE,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  rating DECIMAL(3,2),
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Orders Table
```sql
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  subtotal DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) NOT NULL,
  shipping_amount DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_status VARCHAR(20) DEFAULT 'pending',
  order_status VARCHAR(20) DEFAULT 'pending',
  payment_method VARCHAR(50) NOT NULL,
  razorpay_order_id VARCHAR(255),
  razorpay_payment_id VARCHAR(255),
  razorpay_signature TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Order Items Table
```sql
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name VARCHAR(255) NOT NULL,
  product_image TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. Run the Application

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm run build
npm start
```

The API will be available at `http://localhost:3001`

## 📚 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Health Check
```
GET /health
```

### Product APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/products` | Get all products (with pagination, filters) | No |
| GET | `/products/:id` | Get single product | No |
| GET | `/products/search` | Search products | No |
| GET | `/products/category/:category` | Get products by category | No |
| POST | `/products` | Create new product | Admin |
| PUT | `/products/:id` | Update product | Admin |
| DELETE | `/products/:id` | Delete product | Admin |

### Order APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/orders` | Get all orders | Admin |
| GET | `/orders/:id` | Get single order | Admin |
| GET | `/orders/number/:orderNumber` | Get order by number | No |
| POST | `/orders` | Create new order | No |
| PUT | `/orders/:id` | Update order status | Admin |
| PUT | `/orders/:id/payment` | Update payment details | No |
| DELETE | `/orders/:id` | Delete order | Admin |

### Payment APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/payment/create-order` | Create Razorpay order | No |
| POST | `/payment/verify` | Verify payment signature | No |
| POST | `/payment/webhook` | Handle Razorpay webhooks | No |
| POST | `/payment/refund` | Process refund | Admin |

### Admin APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/admin/stats` | Get dashboard statistics | Admin |
| GET | `/admin/dashboard` | Get extended dashboard data | Admin |

### Notification APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/notifications/order-confirmation` | Send order confirmation | No |
| POST | `/notifications/shipping-update` | Send shipping update | No |
| POST | `/notifications/low-stock` | Send low stock alert | Admin |
| POST | `/notifications/daily-summary` | Send daily summary | Admin |
| POST | `/notifications/test` | Test notifications | Admin |

## 🔐 Authentication

Currently uses a simple token-based authentication for admin routes. Include the admin token in the request headers:

```bash
curl -H "x-admin-token: your_admin_token" http://localhost:3001/api/admin/stats
```

## 📝 Example API Calls

### Get All Products
```bash
curl "http://localhost:3001/api/products?page=1&limit=10&category=herbs"
```

### Create Order
```bash
curl -X POST "http://localhost:3001/api/orders" \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "customer_phone": "+919876543210",
    "shipping_address": {
      "street": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001",
      "country": "India"
    },
    "items": [
      {
        "product_id": "product-uuid",
        "quantity": 2
      }
    ]
  }'
```

### Create Razorpay Order
```bash
curl -X POST "http://localhost:3001/api/payment/create-order" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 500,
    "currency": "INR",
    "receipt": "order_123"
  }'
```

## 🚀 Deployment

### Environment Variables for Production
- Set `NODE_ENV=production`
- Configure production Supabase credentials
- Set up Razorpay production keys
- Configure notification services

### Build for Production
```bash
npm run build
npm start
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

### Code Structure Guidelines
- Controllers handle HTTP requests and responses
- Models handle database operations
- Routes define API endpoints
- Middleware handles cross-cutting concerns
- Utils contain reusable functions

## 📞 Support

For questions or issues, please contact the development team or create an issue in the repository.

## 🔄 Future Enhancements

- [ ] JWT-based authentication system
- [ ] User management and profiles
- [ ] Advanced search and filtering
- [ ] Inventory management
- [ ] Analytics and reporting
- [ ] Email and WhatsApp integration
- [ ] Caching layer (Redis)
- [ ] Rate limiting improvements
- [ ] API documentation (Swagger)
- [ ] Unit and integration tests
