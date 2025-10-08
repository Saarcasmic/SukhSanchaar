import { Request, Response } from 'express';
import { supabase, TABLES, handleSupabaseError } from '../models/supabase';

export class SimpleProductController {
  /**
   * GET /api/products
   * Fetch all products
   */
  static async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const { data, error } = await supabase
        .from(TABLES.PRODUCTS)
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        handleSupabaseError(error, 'fetching products');
      }

      const response = {
        success: true,
        data: {
          data: data || [],
          pagination: {
            page: 1,
            limit: 10,
            total: data?.length || 0,
            totalPages: 1
          }
        }
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch products'
      });
    }
  }

  /**
   * POST /api/products
   * Create a new product
   */
  static async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const productData = {
        ...req.body,
        is_active: req.body.is_active ?? true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        image_onZoom: null, // Temporary: field will be removed from database
        image_product_info: null, // Temporary: field will be removed from database
      };

      const { data, error } = await supabase
        .from(TABLES.PRODUCTS)
        .insert([productData])
        .select()
        .single();

      if (error) {
        handleSupabaseError(error, 'creating product');
      }

      const response = {
        success: true,
        data: data,
        message: 'Product created successfully'
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create product'
      });
    }
  }

  /**
   * PUT /api/products/:id
   * Update a product
   */
  static async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = {
        ...req.body,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from(TABLES.PRODUCTS)
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          res.status(404).json({
            success: false,
            error: 'Product not found'
          });
          return;
        }
        handleSupabaseError(error, 'updating product');
      }

      const response = {
        success: true,
        data: data,
        message: 'Product updated successfully'
      };

      res.json(response);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update product'
      });
    }
  }

  /**
   * DELETE /api/products/:id
   * Delete a product
   */
  static async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const { error } = await supabase
        .from(TABLES.PRODUCTS)
        .delete()
        .eq('id', id);

      if (error) {
        handleSupabaseError(error, 'deleting product');
      }

      const response = {
        success: true,
        message: 'Product deleted successfully'
      };

      res.json(response);
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete product'
      });
    }
  }
}
