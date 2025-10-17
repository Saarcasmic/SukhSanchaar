import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "../types/product";

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
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

// API Helper function
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "API request failed");
  }

  return response.json();
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall("/products?limit=50"); // Get more products for display
      const products = response.data.data || [];

      // Sort products by updated_at in descending order (most recent first)
      const sortedProducts = products.sort((a: Product, b: Product) => {
        const dateA = new Date(a.updated_at).getTime();
        const dateB = new Date(b.updated_at).getTime();
        return dateB - dateA; // Descending order (newest first)
      });

      setProducts(sortedProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Get product by ID
  const getProductById = (id: string): Product | null => {
    return products.find((product) => product.id === id) || null;
  };

  // Search products
  const searchProducts = async (query: string): Promise<Product[]> => {
    try {
      const response = await apiCall(
        `/products/search?q=${encodeURIComponent(query)}`,
      );
      const products = response.data || [];

      // Sort search results by updated_at in descending order (most recent first)
      return products.sort((a: Product, b: Product) => {
        const dateA = new Date(a.updated_at).getTime();
        const dateB = new Date(b.updated_at).getTime();
        return dateB - dateA; // Descending order (newest first)
      });
    } catch (err) {
      console.error("Error searching products:", err);
      return [];
    }
  };

  // Get products by category
  const getProductsByCategory = async (
    category: string,
  ): Promise<Product[]> => {
    try {
      const response = await apiCall(
        `/products/category/${encodeURIComponent(category)}`,
      );
      const products = response.data || [];

      // Sort category results by updated_at in descending order (most recent first)
      return products.sort((a: Product, b: Product) => {
        const dateA = new Date(a.updated_at).getTime();
        const dateB = new Date(b.updated_at).getTime();
        return dateB - dateA; // Descending order (newest first)
      });
    } catch (err) {
      console.error("Error fetching products by category:", err);
      return [];
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        getProductById,
        searchProducts,
        getProductsByCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
