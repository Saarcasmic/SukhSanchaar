// Database Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  category: string;
  image_url: string;
  images?: string[];
  ingredients: string[];
  benefits: string[];
  usage_instructions: string;
  weight: string;
  expiry_date?: string;
  is_active: boolean;
  rating?: number;
  review_count: number;
  created_at: string;
  updated_at: string;
  image_onZoom?: string;
  pack_details: string;
  image_product_info?: string[];
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  billing_address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  items: OrderItem[];
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  total_amount: number;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  order_status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  payment_method: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

// API Request/Response Types
export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  original_price?: number;
  category: string;
  image_url: string;
  images?: string[];
  ingredients: string[];
  benefits: string[];
  usage_instructions: string;
  weight: string;
  expiry_date?: string;
  is_active?: boolean;
  image_onZoom?: string;
  pack_details: string;
  image_product_info?: string[];
  review_count?: number;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {}

export interface CreateOrderRequest {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  billing_address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  items: {
    product_id: string;
    quantity: number;
  }[];
  notes?: string;
}

export interface UpdateOrderRequest {
  order_status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
  notes?: string;
}

// Razorpay Types
export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
  created_at: number;
}

export interface RazorpayPayment {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: string;
  method: string;
  created_at: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Query Parameters
export interface ProductQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sort_by?: 'name' | 'price' | 'created_at' | 'rating';
  sort_order?: 'asc' | 'desc';
  min_price?: number;
  max_price?: number;
  in_stock?: boolean;
}

export interface OrderQueryParams {
  page?: number;
  limit?: number;
  status?: string;
  payment_status?: string;
  customer_email?: string;
  date_from?: string;
  date_to?: string;
}
