import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface Product {
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
  stock_quantity: number;
  is_active: boolean;
  rating?: number;
  review_count?: number;
  created_at: string;
  updated_at: string;
}

interface Order {
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
  items: Array<{
    product_id: string;
    product_name: string;
    product_image: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
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

interface AdminContextType {
  // Authentication
  isAuthenticated: boolean;
  authError: string | null;
  isAuthLoading: boolean;
  login: (password: string) => Promise<void>;
  logout: () => void;
  
  // Data
  products: Product[];
  orders: Order[];
  loading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  fetchProducts: () => Promise<void>;
  fetchOrders: () => Promise<void>;
  updateOrder: (id: string, orderData: Partial<Order>) => Promise<void>;
  addOrder: (order: Omit<Order, 'id' | 'order_number' | 'created_at' | 'updated_at'>) => void;
  updateOrderStatus: (id: string, status: Order['order_status']) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// API Helper function
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-admin-token': import.meta.env.VITE_ADMIN_TOKEN || 'your_admin_token_here',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'API request failed');
  }

  return response.json();
};

// Hardcoded admin password - in production, this should be stored securely
const ADMIN_PASSWORD = 'admin123';

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  
  // Data state
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Authentication functions
  const login = async (password: string) => {
    try {
      setIsAuthLoading(true);
      setAuthError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (password === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
        // Store authentication in localStorage for persistence
        localStorage.setItem('admin_authenticated', 'true');
      } else {
        setAuthError('Incorrect password. Please try again.');
      }
    } catch (err) {
      setAuthError('Login failed. Please try again.');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthError(null);
    localStorage.removeItem('admin_authenticated');
  };

  // Check for existing authentication on mount
  useEffect(() => {
    const isAuth = localStorage.getItem('admin_authenticated') === 'true';
    setIsAuthenticated(isAuth);
  }, []);

  // Fetch products from backend
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall('/products');
      setProducts(response.data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add product to backend
  const addProduct = async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall('/products', {
        method: 'POST',
        body: JSON.stringify(productData),
      });
      
      // Add the new product to local state
      setProducts(prev => [...prev, response.data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add product');
      console.error('Error adding product:', err);
      throw err; // Re-throw to handle in component
    } finally {
      setLoading(false);
    }
  };

  // Update product in backend
  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
      });
      
      // Update the product in local state
      setProducts(prev =>
        prev.map(product =>
          product.id === id ? response.data : product
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product');
      console.error('Error updating product:', err);
      throw err; // Re-throw to handle in component
    } finally {
      setLoading(false);
    }
  };

  // Delete product from backend
  const deleteProduct = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await apiCall(`/products/${id}`, {
        method: 'DELETE',
      });
      
      // Remove the product from local state
      setProducts(prev => prev.filter(product => product.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
      console.error('Error deleting product:', err);
      throw err; // Re-throw to handle in component
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders from backend
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall('/orders');
      // Debug: Log the structure of returned data (remove in production)
      // console.log('Orders API response:', response);
      // console.log('Orders data:', response.data.data);
      setOrders(response.data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update order in backend
  const updateOrder = useCallback(async (id: string, orderData: Partial<Order>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall(`/orders/${id}`, {
        method: 'PUT',
        body: JSON.stringify(orderData),
      });
      
      // Update the order in local state
      setOrders(prev =>
        prev.map(order =>
          order.id === id ? response.data : order
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update order');
      console.error('Error updating order:', err);
      throw err; // Re-throw to handle in component
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch products and orders on component mount
  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, [fetchProducts, fetchOrders]);

  // Legacy functions for orders (keeping for now)
  const addOrder = (orderData: Omit<Order, 'id' | 'order_number' | 'created_at' | 'updated_at'>) => {
    const newOrder = {
      ...orderData,
      id: Date.now().toString(),
      order_number: `SS${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setOrders(prev => [...prev, newOrder]);
  };

  const updateOrderStatus = (id: string, status: Order['order_status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, order_status: status } : order
      )
    );
  };

  return (
    <AdminContext.Provider value={{
      // Authentication
      isAuthenticated,
      authError,
      isAuthLoading,
      login,
      logout,
      
      // Data
      products,
      orders,
      loading,
      error,
      addProduct,
      updateProduct,
      deleteProduct,
      fetchProducts,
      fetchOrders,
      updateOrder,
      addOrder,
      updateOrderStatus,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};