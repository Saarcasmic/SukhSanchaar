"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleProductController = void 0;
const supabase_1 = require("../models/supabase");
class SimpleProductController {
    static async getAllProducts(req, res) {
        try {
            const { data, error } = await supabase_1.supabase
                .from(supabase_1.TABLES.PRODUCTS)
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false });
            if (error) {
                (0, supabase_1.handleSupabaseError)(error, 'fetching products');
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
        }
        catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch products'
            });
        }
    }
    static async createProduct(req, res) {
        try {
            const productData = {
                ...req.body,
                is_active: req.body.is_active ?? true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                image_onZoom: null,
                image_product_info: null,
            };
            const { data, error } = await supabase_1.supabase
                .from(supabase_1.TABLES.PRODUCTS)
                .insert([productData])
                .select()
                .single();
            if (error) {
                (0, supabase_1.handleSupabaseError)(error, 'creating product');
            }
            const response = {
                success: true,
                data: data,
                message: 'Product created successfully'
            };
            res.status(201).json(response);
        }
        catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to create product'
            });
        }
    }
    static async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const updateData = {
                ...req.body,
                updated_at: new Date().toISOString()
            };
            const { data, error } = await supabase_1.supabase
                .from(supabase_1.TABLES.PRODUCTS)
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
                (0, supabase_1.handleSupabaseError)(error, 'updating product');
            }
            const response = {
                success: true,
                data: data,
                message: 'Product updated successfully'
            };
            res.json(response);
        }
        catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to update product'
            });
        }
    }
    static async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const { error } = await supabase_1.supabase
                .from(supabase_1.TABLES.PRODUCTS)
                .delete()
                .eq('id', id);
            if (error) {
                (0, supabase_1.handleSupabaseError)(error, 'deleting product');
            }
            const response = {
                success: true,
                message: 'Product deleted successfully'
            };
            res.json(response);
        }
        catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to delete product'
            });
        }
    }
}
exports.SimpleProductController = SimpleProductController;
//# sourceMappingURL=simpleProductController.js.map