/**
 * Shared Product type definition
 * Matches the current database schema
 */
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
  pack_details: string;
}
