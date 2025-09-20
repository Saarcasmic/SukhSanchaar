import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { RazorpayResponse, PaymentData, PaymentVerification } from '../types/razorpay';

interface Product {
  id: string;
  name: string;
  price: number;
  mrp: number;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  total: number;
  paymentLoading: boolean;
  paymentError: string | null;
  currentOrder: PaymentData | null;
}

interface CartContextType {
  state: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  createRazorpayOrder: (customerDetails: CustomerDetails) => Promise<PaymentData>;
  processPayment: (paymentData: RazorpayResponse, orderId?: string) => Promise<PaymentVerification>;
  clearPaymentError: () => void;
}

interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_PAYMENT_LOADING'; payload: boolean }
  | { type: 'SET_PAYMENT_ERROR'; payload: string | null }
  | { type: 'SET_CURRENT_ORDER'; payload: PaymentData | null };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      const newItems = existingItem
        ? state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.items, { ...action.payload, quantity: 1 }];
      
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return { ...state, items: newItems, total };
    }
    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { ...state, items: newItems, total };
    }
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);
      
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { ...state, items: newItems, total };
    }
    case 'CLEAR_CART':
      return { ...state, items: [], total: 0 };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'SET_PAYMENT_LOADING':
      return { ...state, paymentLoading: action.payload };
    case 'SET_PAYMENT_ERROR':
      return { ...state, paymentError: action.payload };
    case 'SET_CURRENT_ORDER':
      return { ...state, currentOrder: action.payload };
    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  isOpen: false,
  total: 0,
  paymentLoading: false,
  paymentError: null,
  currentOrder: null,
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const createRazorpayOrder = async (customerDetails: CustomerDetails): Promise<PaymentData> => {
    try {
      dispatch({ type: 'SET_PAYMENT_LOADING', payload: true });
      dispatch({ type: 'SET_PAYMENT_ERROR', payload: null });

      const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3001/api';
      const response = await fetch(`${API_BASE_URL}/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: state.total,
          currency: 'INR',
          receipt: `order_${Date.now()}`,
          customer_details: customerDetails, // Include customer details for order tracking
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to create order');
      }

      const paymentData: PaymentData = {
        order_id: data.data.order_id,
        amount: data.data.amount,
        currency: data.data.currency,
        receipt: data.data.receipt,
      };

      dispatch({ type: 'SET_CURRENT_ORDER', payload: paymentData });
      dispatch({ type: 'SET_PAYMENT_LOADING', payload: false });

      return paymentData;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create order';
      dispatch({ type: 'SET_PAYMENT_ERROR', payload: errorMessage });
      dispatch({ type: 'SET_PAYMENT_LOADING', payload: false });
      throw error;
    }
  };

  const processPayment = async (paymentData: RazorpayResponse, orderId?: string): Promise<PaymentVerification> => {
    try {
      dispatch({ type: 'SET_PAYMENT_LOADING', payload: true });
      dispatch({ type: 'SET_PAYMENT_ERROR', payload: null });

      const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3001/api';
      console.log('Sending payment verification request with order_id:', orderId);
      const response = await fetch(`${API_BASE_URL}/payment/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          razorpay_order_id: paymentData.razorpay_order_id,
          razorpay_payment_id: paymentData.razorpay_payment_id,
          razorpay_signature: paymentData.razorpay_signature,
          order_id: orderId, // Include order_id for database update
        }),
      });

      if (!response.ok) {
        throw new Error('Payment verification failed');
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Payment verification failed');
      }

      dispatch({ type: 'SET_PAYMENT_LOADING', payload: false });
      
      return {
        payment_id: data.data.payment_id,
        order_id: data.data.order_id,
        amount: data.data.amount,
        currency: data.data.currency,
        status: data.data.status,
        method: data.data.method,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment verification failed';
      dispatch({ type: 'SET_PAYMENT_ERROR', payload: errorMessage });
      dispatch({ type: 'SET_PAYMENT_LOADING', payload: false });
      throw error;
    }
  };

  const clearPaymentError = () => {
    dispatch({ type: 'SET_PAYMENT_ERROR', payload: null });
  };

  return (
    <CartContext.Provider value={{
      state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleCart,
      createRazorpayOrder,
      processPayment,
      clearPaymentError,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};