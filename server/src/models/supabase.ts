import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './database.types';
import dotenv from 'dotenv';
dotenv.config();



/**
 * Supabase client configuration
 * Uses service role key for admin operations
 */
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase configuration. Please check your environment variables.');
}

// Create Supabase client with service role key for admin operations
export const supabase: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Create Supabase client with anon key for public operations
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
export const supabaseAnon = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey || supabaseServiceKey
);

/**
 * Database table names
 */
export const TABLES = {
  PRODUCTS: 'products',
  ORDERS: 'orders',
  ORDER_ITEMS: 'order_items',
  USERS: 'users',
  ADMINS: 'admins'
} as const;

/**
 * Helper function to handle Supabase errors
 */
export const handleSupabaseError = (error: any, operation: string): never => {
  console.error(`Supabase error during ${operation}:`, error);
  
  if (error?.code) {
    throw new Error(`Database error (${error.code}): ${error.message}`);
  }
  
  throw new Error(`Database error during ${operation}: ${error.message || 'Unknown error'}`);
};

/**
 * Helper function to check if Supabase response is successful
 */
export const isSupabaseSuccess = (response: any): boolean => {
  return response && !response.error;
};
