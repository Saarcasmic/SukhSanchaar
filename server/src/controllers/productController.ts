import { Request, Response } from 'express';
import { ProductModel } from '../models/Product';
import { ApiResponse, ProductQueryParams, CreateProductRequest, UpdateProductRequest } from '../types';
import { ValidationError, NotFoundError } from '../middleware/errorHandler';

export class ProductController {
  /**
   * GET /api/products
   * Fetch all products with pagination, filters, and sorting
   */
  static async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const queryParams: ProductQueryParams = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
        category: req.query.category as string,
        search: req.query.search as string,
        sort_by: req.query.sort_by as any || 'created_at',
        sort_order: req.query.sort_order as any || 'desc',
        min_price: req.query.min_price ? parseFloat(req.query.min_price as string) : undefined,
        max_price: req.query.max_price ? parseFloat(req.query.max_price as string) : undefined,
        in_stock: req.query.in_stock === 'true'
      };

      // Validate pagination parameters
      if (queryParams.page < 1) {
        throw new ValidationError('Page number must be greater than 0');
      }
      if (queryParams.limit < 1 || queryParams.limit > 100) {
        throw new ValidationError('Limit must be between 1 and 100');
      }

      const result = await ProductModel.getAll(queryParams);

      const response: ApiResponse = {
        success: true,
        data: result
      };

      res.json(response);
    } catch (error) {
      console.error('Error in getAllProducts:', error);
      throw error;
    }
  }

  /**
   * GET /api/products/:id
   * Fetch single product details
   */
  static async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        throw new ValidationError('Product ID is required');
      }

      const product = await ProductModel.getById(id);

      if (!product) {
        throw new NotFoundError('Product not found');
      }

      const response: ApiResponse = {
        success: true,
        data: product
      };

      res.json(response);
    } catch (error) {
      console.error('Error in getProductById:', error);
      throw error;
    }
  }

  /**
   * POST /api/products
   * Add new product (Admin only)
   */
  static async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const productData: CreateProductRequest = req.body;

      // Validate required fields
      const requiredFields = ['name', 'description', 'price', 'category', 'image_url', 'ingredients', 'benefits', 'usage_instructions', 'weight', 'stock_quantity'];
      for (const field of requiredFields) {
        if (!productData[field as keyof CreateProductRequest]) {
          throw new ValidationError(`${field} is required`);
        }
      }

      // Validate price
      if (productData.price <= 0) {
        throw new ValidationError('Price must be greater than 0');
      }

      // Validate stock quantity
      if (productData.stock_quantity < 0) {
        throw new ValidationError('Stock quantity cannot be negative');
      }

      const product = await ProductModel.create(productData);

      const response: ApiResponse = {
        success: true,
        data: product,
        message: 'Product created successfully'
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Error in createProduct:', error);
      throw error;
    }
  }

  /**
   * PUT /api/products/:id
   * Update product details (Admin only)
   */
  static async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: UpdateProductRequest = req.body;

      if (!id) {
        throw new ValidationError('Product ID is required');
      }

      // Validate price if provided
      if (updateData.price !== undefined && updateData.price <= 0) {
        throw new ValidationError('Price must be greater than 0');
      }

      // Validate stock quantity if provided
      if (updateData.stock_quantity !== undefined && updateData.stock_quantity < 0) {
        throw new ValidationError('Stock quantity cannot be negative');
      }

      const product = await ProductModel.update(id, updateData);

      const response: ApiResponse = {
        success: true,
        data: product,
        message: 'Product updated successfully'
      };

      res.json(response);
    } catch (error) {
      console.error('Error in updateProduct:', error);
      throw error;
    }
  }

  /**
   * DELETE /api/products/:id
   * Delete product (Admin only)
   */
  static async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        throw new ValidationError('Product ID is required');
      }

      // Check if product exists before deleting
      const existingProduct = await ProductModel.getById(id);
      if (!existingProduct) {
        throw new NotFoundError('Product not found');
      }

      await ProductModel.delete(id);

      const response: ApiResponse = {
        success: true,
        message: 'Product deleted successfully'
      };

      res.json(response);
    } catch (error) {
      console.error('Error in deleteProduct:', error);
      throw error;
    }
  }

  /**
   * GET /api/products/category/:category
   * Get products by category
   */
  static async getProductsByCategory(req: Request, res: Response): Promise<void> {
    try {
      const { category } = req.params;
      const limit = parseInt(req.query.limit as string) || 10;

      if (!category) {
        throw new ValidationError('Category is required');
      }

      const products = await ProductModel.getByCategory(category, limit);

      const response: ApiResponse = {
        success: true,
        data: products
      };

      res.json(response);
    } catch (error) {
      console.error('Error in getProductsByCategory:', error);
      throw error;
    }
  }

  /**
   * GET /api/products/search
   * Search products
   */
  static async searchProducts(req: Request, res: Response): Promise<void> {
    try {
      const { q: searchTerm } = req.query;
      const limit = parseInt(req.query.limit as string) || 10;

      if (!searchTerm || typeof searchTerm !== 'string') {
        throw new ValidationError('Search term is required');
      }

      const products = await ProductModel.search(searchTerm, limit);

      const response: ApiResponse = {
        success: true,
        data: products
      };

      res.json(response);
    } catch (error) {
      console.error('Error in searchProducts:', error);
      throw error;
    }
  }
}
