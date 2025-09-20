/**
 * Database types for Supabase
 * These should match your actual Supabase database schema
 */
export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          original_price: number | null;
          category: string;
          image_url: string;
          images: string[] | null;
          ingredients: string[];
          benefits: string[];
          usage_instructions: string;
          weight: string;
          expiry_date: string | null;
          stock_quantity: number;
          is_active: boolean;
          rating: number | null;
          review_count: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          price: number;
          original_price?: number | null;
          category: string;
          image_url: string;
          images?: string[] | null;
          ingredients: string[];
          benefits: string[];
          usage_instructions: string;
          weight: string;
          expiry_date?: string | null;
          stock_quantity: number;
          is_active?: boolean;
          rating?: number | null;
          review_count?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price?: number;
          original_price?: number | null;
          category?: string;
          image_url?: string;
          images?: string[] | null;
          ingredients?: string[];
          benefits?: string[];
          usage_instructions?: string;
          weight?: string;
          expiry_date?: string | null;
          stock_quantity?: number;
          is_active?: boolean;
          rating?: number | null;
          review_count?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
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
          billing_address: {
            street: string;
            city: string;
            state: string;
            pincode: string;
            country: string;
          } | null;
          subtotal: number;
          tax_amount: number;
          shipping_amount: number;
          total_amount: number;
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
          order_status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
          payment_method: string;
          razorpay_order_id: string | null;
          razorpay_payment_id: string | null;
          razorpay_signature: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
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
          } | null;
          subtotal: number;
          tax_amount: number;
          shipping_amount: number;
          total_amount: number;
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
          order_status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
          payment_method: string;
          razorpay_order_id?: string | null;
          razorpay_payment_id?: string | null;
          razorpay_signature?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_number?: string;
          customer_name?: string;
          customer_email?: string;
          customer_phone?: string;
          shipping_address?: {
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
          } | null;
          subtotal?: number;
          tax_amount?: number;
          shipping_amount?: number;
          total_amount?: number;
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
          order_status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
          payment_method?: string;
          razorpay_order_id?: string | null;
          razorpay_payment_id?: string | null;
          razorpay_signature?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          product_name: string;
          product_image: string;
          quantity: number;
          unit_price: number;
          total_price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          product_name: string;
          product_image: string;
          quantity: number;
          unit_price: number;
          total_price: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          product_name?: string;
          product_image?: string;
          quantity?: number;
          unit_price?: number;
          total_price?: number;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
