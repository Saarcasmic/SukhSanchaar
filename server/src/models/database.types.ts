/**
 * Database types for Supabase
 * Updated with current live schema from Supabase database
 * Generated on: 2025-01-08
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
          is_active: boolean;
          rating: number | null;
          review_count: number;
          created_at: string;
          updated_at: string;
          image_onZoom: string | null;
          pack_details: string;
          image_product_info: string[] | null;
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
          is_active?: boolean;
          rating?: number | null;
          review_count?: number;
          created_at?: string;
          updated_at?: string;
          image_onZoom?: string | null;
          pack_details?: string;
          image_product_info?: string[] | null;
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
          is_active?: boolean;
          rating?: number | null;
          review_count?: number;
          created_at?: string;
          updated_at?: string;
          image_onZoom?: string | null;
          pack_details?: string;
          image_product_info?: string[] | null;
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
      pack_type: '1' | '2' | '3' | '4' | '5' | '6' | '7';
    };
  };
}
