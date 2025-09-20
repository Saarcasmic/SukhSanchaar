import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  getProductById: (id: string) => Product | null;
  searchProducts: (query: string) => Promise<Product[]>;
  getProductsByCategory: (category: string) => Promise<Product[]>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// API Helper function
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
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

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall('/products?limit=50'); // Get more products for display
      setProducts(response.data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get product by ID
  const getProductById = (id: string): Product | null => {
    return products.find(product => product.id === id) || null;
  };

  // Search products
  const searchProducts = async (query: string): Promise<Product[]> => {
    try {
      const response = await apiCall(`/products/search?q=${encodeURIComponent(query)}`);
      return response.data || [];
    } catch (err) {
      console.error('Error searching products:', err);
      return [];
    }
  };

  // Get products by category
  const getProductsByCategory = async (category: string): Promise<Product[]> => {
    try {
      const response = await apiCall(`/products/category/${encodeURIComponent(category)}`);
      return response.data || [];
    } catch (err) {
      console.error('Error fetching products by category:', err);
      return [];
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      error,
      fetchProducts,
      getProductById,
      searchProducts,
      getProductsByCategory,
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
