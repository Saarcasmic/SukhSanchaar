import { supabase, TABLES, handleSupabaseError, isSupabaseSuccess } from './supabase';
import { Product, CreateProductRequest, UpdateProductRequest, ProductQueryParams, PaginatedResponse } from '../types';

export class ProductModel {
  /**
   * Get all products with pagination and filters
   */
  static async getAll(queryParams: ProductQueryParams = {}): Promise<PaginatedResponse<Product>> {
    try {
      const {
        page = 1,
        limit = 10,
        category,
        search,
        sort_by = 'created_at',
        sort_order = 'desc',
        min_price,
        max_price,
        in_stock = true
      } = queryParams;

      let query = supabase
        .from(TABLES.PRODUCTS)
        .select('*', { count: 'exact' });

      // Apply filters
      if (category) {
        query = query.eq('category', category);
      }

      if (search) {
        query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,ingredients.cs.{${search}}`);
      }

      if (min_price !== undefined) {
        query = query.gte('price', min_price);
      }

      if (max_price !== undefined) {
        query = query.lte('price', max_price);
      }

      if (in_stock) {
        query = query.gt('stock_quantity', 0);
      }

      // Apply sorting
      query = query.order(sort_by, { ascending: sort_order === 'asc' });

      // Apply pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) {
        handleSupabaseError(error, 'fetching products');
      }

      const totalPages = Math.ceil((count || 0) / limit);

      return {
        data: data || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages
        }
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  /**
   * Get a single product by ID
   */
  static async getById(id: string): Promise<Product | null> {
    try {
      const { data, error } = await supabase
        .from(TABLES.PRODUCTS)
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Product not found
        }
        handleSupabaseError(error, 'fetching product');
      }

      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  /**
   * Create a new product
   */
  static async create(productData: CreateProductRequest): Promise<Product> {
    try {
      const { data, error } = await supabase
        .from(TABLES.PRODUCTS)
        .insert([{
          ...productData,
          is_active: productData.is_active ?? true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        handleSupabaseError(error, 'creating product');
      }

      return data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  /**
   * Update a product
   */
  static async update(id: string, updateData: UpdateProductRequest): Promise<Product> {
    try {
      const { data, error } = await supabase
        .from(TABLES.PRODUCTS)
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error('Product not found');
        }
        handleSupabaseError(error, 'updating product');
      }

      return data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  /**
   * Delete a product
   */
  static async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from(TABLES.PRODUCTS)
        .delete()
        .eq('id', id);

      if (error) {
        handleSupabaseError(error, 'deleting product');
      }

      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  /**
   * Update product stock quantity
   */
  static async updateStock(id: string, quantity: number): Promise<Product> {
    try {
      const { data, error } = await supabase
        .from(TABLES.PRODUCTS)
        .update({
          stock_quantity: quantity,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        handleSupabaseError(error, 'updating product stock');
      }

      return data;
    } catch (error) {
      console.error('Error updating product stock:', error);
      throw error;
    }
  }

  /**
   * Get products by category
   */
  static async getByCategory(category: string, limit: number = 10): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from(TABLES.PRODUCTS)
        .select('*')
        .eq('category', category)
        .eq('is_active', true)
        .gt('stock_quantity', 0)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        handleSupabaseError(error, 'fetching products by category');
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  }

  /**
   * Search products
   */
  static async search(searchTerm: string, limit: number = 10): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from(TABLES.PRODUCTS)
        .select('*')
        .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,ingredients.cs.{${searchTerm}}`)
        .eq('is_active', true)
        .gt('stock_quantity', 0)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        handleSupabaseError(error, 'searching products');
      }

      return data || [];
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }
}
