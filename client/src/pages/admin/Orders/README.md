# Admin Orders Page

A comprehensive order management system for the SukhSanchaar Ayurvedic e-commerce admin dashboard.

## Features

### 🔍 Search & Filtering
- **Search Bar**: Filter orders by order ID, customer name, or payment ID (case-insensitive)
- **Status Tabs**: Filter by order status (All, Pending, Processing, Shipped, Delivered, Cancelled)
- **Real-time Filtering**: Instant results as you type or select filters

### 📊 Table Display
- **Sortable Columns**: Click headers to sort by name, order date, order status, or payment status
- **Responsive Design**: Horizontal scroll on mobile devices
- **Pagination**: 10, 20, or 50 items per page with navigation controls
- **Status Badges**: Color-coded badges for order and payment status

### 📋 Order Details Modal
- **Complete Order Information**: Customer details, shipping address, order items, payment info
- **Status Management**: Update order status with dropdown selection
- **Order Timeline**: Created and updated timestamps
- **Payment Details**: Razorpay order ID, payment ID, and signature

### 🎨 Styling & UX
- **TailwindCSS**: Modern, responsive design
- **Hover Effects**: Interactive table rows and buttons
- **Loading States**: Spinners and error handling
- **Mobile-Friendly**: Responsive layout for all screen sizes

## Components

### OrdersPage.tsx
Main component that displays the orders table with search, filtering, and pagination.

**Props**: None (uses AdminContext for data)

**Key Features**:
- Search functionality
- Status filtering tabs
- Sortable table columns
- Pagination controls
- Order selection for modal

### OrderModal.tsx
Modal component for viewing and editing order details.

**Props**:
- `order: Order` - Order data to display
- `onClose: () => void` - Function to close modal
- `onUpdate: (orderId: string, updates: Partial<Order>) => Promise<void>` - Function to update order

**Key Features**:
- Complete order information display
- Status update functionality
- Customer information section
- Order items table
- Payment information
- Order timeline

## Usage

The OrdersPage is automatically integrated into the AdminDashboard and can be accessed via the `/admin` route when the "Orders" tab is selected.

### Navigation
1. Go to `/admin` route
2. Click on "Orders" tab in the sidebar
3. Use search bar to find specific orders
4. Click on status tabs to filter orders
5. Click on order ID to view details in modal
6. Use pagination to navigate through orders

### Order Management
1. Click on any order ID to open the details modal
2. View complete order information
3. Use the status dropdown to change order status
4. Click "Save Changes" to update the order
5. Changes are immediately reflected in the table

## API Integration

The component integrates with the following backend endpoints:

- `GET /api/orders` - Fetch all orders
- `PUT /api/orders/:id` - Update order status

All API calls are handled through the AdminContext with proper error handling and loading states.

## Styling

The component uses a consistent color scheme with the SukhSanchaar brand:
- Primary: `ayur-red` (#8B4513)
- Secondary: `ayur-gold` (#DAA520)
- Background: `cream-50` (#FDF6E3)
- Text: `antique-brown` (#8B4513)

## Responsive Design

- **Desktop**: Full table with all columns visible
- **Tablet**: Optimized layout with adjusted spacing
- **Mobile**: Horizontal scroll with touch-friendly controls

## Error Handling

- Loading states with spinners
- Error messages for failed API calls
- Graceful fallbacks for missing data
- Retry functionality for failed requests
