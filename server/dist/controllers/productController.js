"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const Product_1 = require("../models/Product");
const errorHandler_1 = require("../middleware/errorHandler");
class ProductController {
    static async getAllProducts(req, res) {
        try {
            const queryParams = {
                page: parseInt(req.query.page) || 1,
                limit: parseInt(req.query.limit) || 10,
                category: req.query.category,
                search: req.query.search,
                sort_by: req.query.sort_by || 'created_at',
                sort_order: req.query.sort_order || 'desc',
                min_price: req.query.min_price ? parseFloat(req.query.min_price) : undefined,
                max_price: req.query.max_price ? parseFloat(req.query.max_price) : undefined,
                in_stock: req.query.in_stock === 'true'
            };
            if (queryParams.page < 1) {
                throw new errorHandler_1.ValidationError('Page number must be greater than 0');
            }
            if (queryParams.limit < 1 || queryParams.limit > 100) {
                throw new errorHandler_1.ValidationError('Limit must be between 1 and 100');
            }
            const result = await Product_1.ProductModel.getAll(queryParams);
            const response = {
                success: true,
                data: result
            };
            res.json(response);
        }
        catch (error) {
            console.error('Error in getAllProducts:', error);
            throw error;
        }
    }
    static async getProductById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                throw new errorHandler_1.ValidationError('Product ID is required');
            }
            const product = await Product_1.ProductModel.getById(id);
            if (!product) {
                throw new errorHandler_1.NotFoundError('Product not found');
            }
            const response = {
                success: true,
                data: product
            };
            res.json(response);
        }
        catch (error) {
            console.error('Error in getProductById:', error);
            throw error;
        }
    }
    static async createProduct(req, res) {
        try {
            const productData = req.body;
            const requiredFields = ['name', 'description', 'price', 'category', 'image_url', 'ingredients', 'benefits', 'usage_instructions', 'weight', 'stock_quantity'];
            for (const field of requiredFields) {
                if (!productData[field]) {
                    throw new errorHandler_1.ValidationError(`${field} is required`);
                }
            }
            if (productData.price <= 0) {
                throw new errorHandler_1.ValidationError('Price must be greater than 0');
            }
            if (productData.stock_quantity < 0) {
                throw new errorHandler_1.ValidationError('Stock quantity cannot be negative');
            }
            const product = await Product_1.ProductModel.create(productData);
            const response = {
                success: true,
                data: product,
                message: 'Product created successfully'
            };
            res.status(201).json(response);
        }
        catch (error) {
            console.error('Error in createProduct:', error);
            throw error;
        }
    }
    static async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            if (!id) {
                throw new errorHandler_1.ValidationError('Product ID is required');
            }
            if (updateData.price !== undefined && updateData.price <= 0) {
                throw new errorHandler_1.ValidationError('Price must be greater than 0');
            }
            if (updateData.stock_quantity !== undefined && updateData.stock_quantity < 0) {
                throw new errorHandler_1.ValidationError('Stock quantity cannot be negative');
            }
            const product = await Product_1.ProductModel.update(id, updateData);
            const response = {
                success: true,
                data: product,
                message: 'Product updated successfully'
            };
            res.json(response);
        }
        catch (error) {
            console.error('Error in updateProduct:', error);
            throw error;
        }
    }
    static async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                throw new errorHandler_1.ValidationError('Product ID is required');
            }
            const existingProduct = await Product_1.ProductModel.getById(id);
            if (!existingProduct) {
                throw new errorHandler_1.NotFoundError('Product not found');
            }
            await Product_1.ProductModel.delete(id);
            const response = {
                success: true,
                message: 'Product deleted successfully'
            };
            res.json(response);
        }
        catch (error) {
            console.error('Error in deleteProduct:', error);
            throw error;
        }
    }
    static async getProductsByCategory(req, res) {
        try {
            const { category } = req.params;
            const limit = parseInt(req.query.limit) || 10;
            if (!category) {
                throw new errorHandler_1.ValidationError('Category is required');
            }
            const products = await Product_1.ProductModel.getByCategory(category, limit);
            const response = {
                success: true,
                data: products
            };
            res.json(response);
        }
        catch (error) {
            console.error('Error in getProductsByCategory:', error);
            throw error;
        }
    }
    static async searchProducts(req, res) {
        try {
            const { q: searchTerm } = req.query;
            const limit = parseInt(req.query.limit) || 10;
            if (!searchTerm || typeof searchTerm !== 'string') {
                throw new errorHandler_1.ValidationError('Search term is required');
            }
            const products = await Product_1.ProductModel.search(searchTerm, limit);
            const response = {
                success: true,
                data: products
            };
            res.json(response);
        }
        catch (error) {
            console.error('Error in searchProducts:', error);
            throw error;
        }
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=productController.js.map