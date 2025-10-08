"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const supabase_1 = require("./supabase");
class ProductModel {
    static async getAll(queryParams = {}) {
        try {
            const { page = 1, limit = 10, category, search, sort_by = 'created_at', sort_order = 'desc', min_price, max_price, in_stock = true } = queryParams;
            let query = supabase_1.supabase
                .from(supabase_1.TABLES.PRODUCTS)
                .select('*', { count: 'exact' });
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
            query = query.order(sort_by, { ascending: sort_order === 'asc' });
            const from = (page - 1) * limit;
            const to = from + limit - 1;
            query = query.range(from, to);
            const { data, error, count } = await query;
            if (error) {
                (0, supabase_1.handleSupabaseError)(error, 'fetching products');
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
        }
        catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }
    static async getById(id) {
        try {
            const { data, error } = await supabase_1.supabase
                .from(supabase_1.TABLES.PRODUCTS)
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                if (error.code === 'PGRST116') {
                    return null;
                }
                (0, supabase_1.handleSupabaseError)(error, 'fetching product');
            }
            return data;
        }
        catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    }
    static async create(productData) {
        try {
            const { data, error } = await supabase_1.supabase
                .from(supabase_1.TABLES.PRODUCTS)
                .insert([{
                    ...productData,
                    image_onZoom: null,
                    image_product_info: null,
                    is_active: productData.is_active ?? true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }])
                .select()
                .single();
            if (error) {
                (0, supabase_1.handleSupabaseError)(error, 'creating product');
            }
            return data;
        }
        catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    }
    static async update(id, updateData) {
        try {
            const { data, error } = await supabase_1.supabase
                .from(supabase_1.TABLES.PRODUCTS)
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
                (0, supabase_1.handleSupabaseError)(error, 'updating product');
            }
            return data;
        }
        catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    }
    static async delete(id) {
        try {
            const { error } = await supabase_1.supabase
                .from(supabase_1.TABLES.PRODUCTS)
                .delete()
                .eq('id', id);
            if (error) {
                (0, supabase_1.handleSupabaseError)(error, 'deleting product');
            }
            return true;
        }
        catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }
    static async updateStock(id, quantity) {
        throw new Error('Stock management is no longer supported - stock_quantity field has been removed from the schema');
    }
    static async getByCategory(category, limit = 10) {
        try {
            const { data, error } = await supabase_1.supabase
                .from(supabase_1.TABLES.PRODUCTS)
                .select('*')
                .eq('category', category)
                .eq('is_active', true)
                .order('created_at', { ascending: false })
                .limit(limit);
            if (error) {
                (0, supabase_1.handleSupabaseError)(error, 'fetching products by category');
            }
            return data || [];
        }
        catch (error) {
            console.error('Error fetching products by category:', error);
            throw error;
        }
    }
    static async search(searchTerm, limit = 10) {
        try {
            const { data, error } = await supabase_1.supabase
                .from(supabase_1.TABLES.PRODUCTS)
                .select('*')
                .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,ingredients.cs.{${searchTerm}}`)
                .eq('is_active', true)
                .order('created_at', { ascending: false })
                .limit(limit);
            if (error) {
                (0, supabase_1.handleSupabaseError)(error, 'searching products');
            }
            return data || [];
        }
        catch (error) {
            console.error('Error searching products:', error);
            throw error;
        }
    }
}
exports.ProductModel = ProductModel;
//# sourceMappingURL=Product.js.map