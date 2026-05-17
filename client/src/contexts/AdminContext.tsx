import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { Product } from "../types/product";
import { MarketingProduct } from "../pages/MarketFormPage";

export interface MarketingArea {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
}

export interface MarketingResponse {
  id: string;
  date: string;
  time_of_visit: string;
  marketing_person_name: string;
  doctor_shop_name: string;
  area: string;
  products_discussed: string[];
  samples_given: string;
  order_taken: boolean;
  order_details: { product_name: string; quantity: number }[];
  photo_proof_url: string | null;
  location: { latitude: number; longitude: number } | null;
  status: string;
  pay_status: string | null;
  advance_amount: number | null;
  created_at: string;
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
  payment_status: "pending" | "paid" | "failed" | "refunded";
  order_status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
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
  addProduct: (
    product: Omit<Product, "id" | "created_at" | "updated_at">,
  ) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  fetchProducts: () => Promise<void>;
  fetchOrders: (page?: number, limit?: number) => Promise<any>;
  updateOrder: (id: string, orderData: Partial<Order>) => Promise<void>;
  addOrder: (
    order: Omit<Order, "id" | "order_number" | "created_at" | "updated_at">,
  ) => void;
  updateOrderStatus: (id: string, status: Order["order_status"]) => void;

  // Marketing Data
  marketingProducts: MarketingProduct[];
  marketingResponses: MarketingResponse[];
  marketingTeam: { id: string; name: string; is_active: boolean; created_at: string }[];
  marketingAreas: MarketingArea[];
  fetchMarketingProducts: () => Promise<void>;
  addMarketingProduct: (name: string) => Promise<void>;
  deleteMarketingProduct: (id: string) => Promise<void>;
  reorderMarketingProducts: (items: { id: string; sequence: number }[]) => Promise<void>;
  fetchMarketingResponses: () => Promise<void>;
  updateMarketingResponseStatus: (id: string, status: string) => Promise<void>;
  updateMarketingPayStatus: (id: string, pay_status: string, advance_amount?: number) => Promise<void>;
  deleteMarketingResponse: (id: string) => Promise<void>;
  fetchMarketingTeam: () => Promise<void>;
  addMarketingTeamMember: (name: string) => Promise<void>;
  deleteMarketingTeamMember: (id: string) => Promise<void>;
  fetchMarketingAreas: () => Promise<void>;
  addMarketingArea: (name: string) => Promise<void>;
  deleteMarketingArea: (id: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// API Base URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

// API Helper function
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      "x-admin-token":
        import.meta.env.VITE_ADMIN_TOKEN || "your_admin_token_here",
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

// Hardcoded admin password - in production, this should be stored securely
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_KEY;

export const AdminProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Data state
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [marketingProducts, setMarketingProducts] = useState<MarketingProduct[]>([]);
  const [marketingResponses, setMarketingResponses] = useState<MarketingResponse[]>([]);
  const [marketingTeam, setMarketingTeam] = useState<{ id: string; name: string; is_active: boolean; created_at: string }[]>([]);
  const [marketingAreas, setMarketingAreas] = useState<MarketingArea[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Authentication functions
  const login = async (password: string) => {
    try {
      setIsAuthLoading(true);
      setAuthError(null);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (password === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
        // Store authentication in localStorage for persistence
        localStorage.setItem("admin_authenticated", "true");
      } else {
        setAuthError("Incorrect password. Please try again.");
      }
    } catch (err) {
      setAuthError("Login failed. Please try again.");
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthError(null);
    localStorage.removeItem("admin_authenticated");
  };

  // Check for existing authentication on mount
  useEffect(() => {
    const isAuth = localStorage.getItem("admin_authenticated") === "true";
    setIsAuthenticated(isAuth);
  }, []);

  // Fetch products from backend
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall("/products");
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
  }, []);

  // Add product to backend
  const addProduct = async (
    productData: Omit<Product, "id" | "created_at" | "updated_at">,
  ) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall("/products", {
        method: "POST",
        body: JSON.stringify(productData),
      });

      // Add the new product to local state
      setProducts((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add product");
      console.error("Error adding product:", err);
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
        method: "PUT",
        body: JSON.stringify(productData),
      });

      // Update the product in local state
      setProducts((prev) =>
        prev.map((product) => (product.id === id ? response.data : product)),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update product");
      console.error("Error updating product:", err);
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
        method: "DELETE",
      });

      // Remove the product from local state
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
      console.error("Error deleting product:", err);
      throw err; // Re-throw to handle in component
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders from backend with pagination
  const fetchOrders = useCallback(
    async (page: number = 1, limit: number = 50) => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiCall(`/orders?page=${page}&limit=${limit}`);
        // Debug: Log the structure of returned data (remove in production)
        // console.log('Orders API response:', response);
        // console.log('Orders data:', response.data.data);
        setOrders(response.data.data || []);
        return response.data.pagination; // Return pagination info for the component
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch orders");
        console.error("Error fetching orders:", err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Update order in backend
  const updateOrder = useCallback(
    async (id: string, orderData: Partial<Order>) => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiCall(`/orders/${id}`, {
          method: "PUT",
          body: JSON.stringify(orderData),
        });

        // Update the order in local state
        setOrders((prev) =>
          prev.map((order) => (order.id === id ? response.data : order)),
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update order");
        console.error("Error updating order:", err);
        throw err; // Re-throw to handle in component
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Marketing functions
  const fetchMarketingProducts = useCallback(async () => {
    try {
      const response = await apiCall('/marketing/products');
      setMarketingProducts(response.data || []);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const addMarketingProduct = async (name: string) => {
    try {
      const response = await apiCall('/marketing/products', {
        method: 'POST',
        body: JSON.stringify({ name, is_active: true })
      });
      setMarketingProducts(prev => [response.data, ...prev]);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteMarketingProduct = async (id: string) => {
    try {
      await apiCall(`/marketing/products/${id}`, { method: 'DELETE' });
      setMarketingProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const reorderMarketingProducts = async (items: { id: string; sequence: number }[]) => {
    try {
      await apiCall(`/marketing/products/reorder`, {
        method: 'PUT',
        body: JSON.stringify({ items })
      });
      // Optionally re-fetch or assume frontend sorted it
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const fetchMarketingResponses = useCallback(async () => {
    try {
      const response = await apiCall('/marketing/responses');
      setMarketingResponses(response.data || []);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const updateMarketingResponseStatus = async (id: string, status: string) => {
    try {
      const response = await apiCall(`/marketing/responses/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
      setMarketingResponses(prev => prev.map(r => r.id === id ? response.data : r));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const updateMarketingPayStatus = async (id: string, pay_status: string, advance_amount?: number) => {
    try {
      const response = await apiCall(`/marketing/responses/${id}/pay-status`, {
        method: 'PATCH',
        body: JSON.stringify({ pay_status, advance_amount })
      });
      setMarketingResponses(prev => prev.map(r => r.id === id ? response.data : r));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteMarketingResponse = async (id: string) => {
    try {
      await apiCall(`/marketing/responses/${id}`, { method: 'DELETE' });
      setMarketingResponses(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const fetchMarketingTeam = useCallback(async () => {
    try {
      const response = await apiCall('/marketing/team');
      setMarketingTeam(response.data || []);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const addMarketingTeamMember = async (name: string) => {
    try {
      const response = await apiCall('/marketing/team', {
        method: 'POST',
        body: JSON.stringify({ name, is_active: true })
      });
      setMarketingTeam(prev => [response.data, ...prev]);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteMarketingTeamMember = async (id: string) => {
    try {
      await apiCall(`/marketing/team/${id}`, { method: 'DELETE' });
      setMarketingTeam(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const fetchMarketingAreas = useCallback(async () => {
    try {
      const response = await apiCall('/marketing/areas');
      setMarketingAreas(response.data || []);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const addMarketingArea = async (name: string) => {
    try {
      const response = await apiCall('/marketing/areas', {
        method: 'POST',
        body: JSON.stringify({ name, is_active: true })
      });
      setMarketingAreas(prev => [response.data, ...prev]);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteMarketingArea = async (id: string) => {
    try {
      await apiCall(`/marketing/areas/${id}`, { method: 'DELETE' });
      setMarketingAreas(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // Only fetch core e-commerce data globally.
  // Marketing data is lazy-loaded by the admin marketing pages when they mount.
  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, [fetchProducts, fetchOrders]);

  // Legacy functions for orders (keeping for now)
  const addOrder = (
    orderData: Omit<Order, "id" | "order_number" | "created_at" | "updated_at">,
  ) => {
    const newOrder = {
      ...orderData,
      id: Date.now().toString(),
      order_number: `SS${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setOrders((prev) => [...prev, newOrder]);
  };

  const updateOrderStatus = (id: string, status: Order["order_status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, order_status: status } : order,
      ),
    );
  };

  return (
    <AdminContext.Provider
      value={{
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
        
        // Marketing
        marketingProducts,
        marketingResponses,
        fetchMarketingProducts,
        addMarketingProduct,
        deleteMarketingProduct,
        reorderMarketingProducts,
        fetchMarketingResponses,
        updateMarketingResponseStatus,
        updateMarketingPayStatus,
        deleteMarketingResponse,
        fetchMarketingTeam,
        addMarketingTeamMember,
        deleteMarketingTeamMember,
        marketingTeam,
        marketingAreas,
        fetchMarketingAreas,
        addMarketingArea,
        deleteMarketingArea,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
