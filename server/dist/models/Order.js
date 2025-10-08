"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const supabase_1 = require("./supabase");
class OrderModel {
    static async getAll(queryParams = {}) {
        try {
            const { page = 1, limit = 10, status, payment_status, customer_email, date_from, date_to } = queryParams;
            let query = supabase_1.supabase
                .from(supabase_1.TABLES.ORDERS)
                .select(`
          *,
          order_items (
            id,
            product_id,
            product_name,
            product_image,
            quantity,
            unit_price,
            total_price
          )
        `, { count: 'exact' });
            if (status) {
                query = query.eq('order_status', status);
            }
            if (payment_status) {
                query = query.eq('payment_status', payment_status);
            }
            if (customer_email) {
                query = query.eq('customer_email', customer_email);
            }
            if (date_from) {
                query = query.gte('created_at', date_from);
            }
            if (date_to) {
                query = query.lte('created_at', date_to);
            }
            query = query.order('created_at', { ascending: false });
            const from = (page - 1) * limit;
            const to = from + limit - 1;
            query = query.range(from, to);
            const { data, error, count } = await query;
            if (error) {
                (0, supabase_1.handleSupabaseError)(error, 'fetching orders');
            }
            const transformedData = (data || []).map((order) => ({
                ...order,
                items: order.order_items || []
            }));
            const totalPages = Math.ceil((count || 0) / limit);
            return {
                data: transformedData,
                pagination: {
                    page,
                    limit,
                    total: count || 0,
                    totalPages
                }
            };
        }
        catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    }
    static async getById(id) {
        try {
            const { data, error } = await supabase_1.supabase
                .from(supabase_1.TABLES.ORDERS)
                .select(`
          *,
          order_items (
            id,
            product_id,
            product_name,
            product_image,
            quantity,
            unit_price,
            total_price
          )
        `)
                .eq('id', id)
                .single();
            if (error) {
                if (error.code === 'PGRST116') {
                    return null;
                }
                (0, supabase_1.handleSupabaseError)(error, 'fetching order');
            }
            return data ? {
                ...data,
                items: data.order_items || []
            } : null;
        }
        catch (error) {
            console.error('Error fetching order:', error);
            throw error;
        }
    }
    static async getByOrderNumber(orderNumber) {
        try {
            const { data, error } = await supabase_1.supabase
                .from(supabase_1.TABLES.ORDERS)
                .select(`
          *,
          order_items (
            id,
            product_id,
            product_name,
            product_image,
            quantity,
            unit_price,
            total_price
          )
        `)
                .eq('order_number', orderNumber)
                .single();
            if (error) {
                if (error.code === 'PGRST116') {
                    return null;
                }
                (0, supabase_1.handleSupabaseError)(error, 'fetching order by number');
            }
            return data ? {
                ...data,
                items: data.order_items || []
            } : null;
        }
        catch (error) {
            console.error('Error fetching order by number:', error);
            throw error;
        }
    }
    static async create(orderData) {
        try {
            const orderNumber = await this.generateOrderNumber();
            const { subtotal, tax_amount, shipping_amount, total_amount } = await this.calculateOrderTotals(orderData.items, orderData.shipping_address);
            const { data: order, error: orderError } = await supabase_1.supabase
                .from(supabase_1.TABLES.ORDERS)
                .insert([{
                    order_number: orderNumber,
                    customer_name: orderData.customer_name,
                    customer_email: orderData.customer_email,
                    customer_phone: orderData.customer_phone,
                    shipping_address: orderData.shipping_address,
                    billing_address: orderData.billing_address || orderData.shipping_address,
                    subtotal,
                    tax_amount,
                    shipping_amount,
                    total_amount,
                    payment_status: 'pending',
                    order_status: 'pending',
                    payment_method: 'razorpay',
                    notes: orderData.notes,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }])
                .select()
                .single();
            if (orderError) {
                (0, supabase_1.handleSupabaseError)(orderError, 'creating order');
            }
            const orderItems = await this.createOrderItems(order.id, orderData.items);
            await this.updateProductStock(orderData.items, 'decrease');
            return {
                ...order,
                items: orderItems
            };
        }
        catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    }
    static async update(id, updateData) {
        try {
            const { data, error } = await supabase_1.supabase
                .from(supabase_1.TABLES.ORDERS)
                .update({
                ...updateData,
                updated_at: new Date().toISOString()
            })
                .eq('id', id)
                .select(`
          *,
          order_items (
            id,
            product_id,
            product_name,
            product_image,
            quantity,
            unit_price,
            total_price
          )
        `)
                .single();
            if (error) {
                if (error.code === 'PGRST116') {
                    throw new Error('Order not found');
                }
                (0, supabase_1.handleSupabaseError)(error, 'updating order');
            }
            return data ? {
                ...data,
                items: data.order_items || []
            } : data;
        }
        catch (error) {
            console.error('Error updating order:', error);
            throw error;
        }
    }
    static async delete(id) {
        try {
            const order = await this.getById(id);
            if (order && order.items && Array.isArray(order.items)) {
                const items = order.items.map(item => ({
                    product_id: item.product_id,
                    quantity: item.quantity
                }));
                await this.updateProductStock(items, 'increase');
            }
            await supabase_1.supabase
                .from(supabase_1.TABLES.ORDER_ITEMS)
                .delete()
                .eq('order_id', id);
            const { error } = await supabase_1.supabase
                .from(supabase_1.TABLES.ORDERS)
                .delete()
                .eq('id', id);
            if (error) {
                (0, supabase_1.handleSupabaseError)(error, 'deleting order');
            }
            return true;
        }
        catch (error) {
            console.error('Error deleting order:', error);
            throw error;
        }
    }
    static async updatePaymentDetails(orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature) {
        try {
            const { data, error } = await supabase_1.supabase
                .from(supabase_1.TABLES.ORDERS)
                .update({
                razorpay_order_id: razorpayOrderId,
                razorpay_payment_id: razorpayPaymentId,
                razorpay_signature: razorpaySignature,
                payment_status: 'paid',
                order_status: 'confirmed',
                updated_at: new Date().toISOString()
            })
                .eq('id', orderId)
                .select(`
          *,
          order_items (
            id,
            product_id,
            product_name,
            product_image,
            quantity,
            unit_price,
            total_price
          )
        `)
                .single();
            if (error) {
                (0, supabase_1.handleSupabaseError)(error, 'updating payment details');
            }
            return data ? {
                ...data,
                items: data.order_items || []
            } : data;
        }
        catch (error) {
            console.error('Error updating payment details:', error);
            throw error;
        }
    }
    static async generateOrderNumber() {
        const timestamp = Date.now().toString();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `SS${timestamp.slice(-6)}${random}`;
    }
    static async calculateOrderTotals(items, shippingAddress) {
        let subtotal = 0;
        for (const item of items) {
            const { data: product } = await supabase_1.supabase
                .from(supabase_1.TABLES.PRODUCTS)
                .select('price')
                .eq('id', item.product_id)
                .single();
            if (product) {
                subtotal += product.price * item.quantity;
            }
        }
        const tax_amount = 0;
        const getShippingCharges = (state) => {
            switch (state) {
                case "Delhi":
                    return 50;
                case "Rajasthan":
                    return 100;
                case "Uttar Pradesh":
                    return 30;
                case "Others":
                    return 0;
                default:
                    return 0;
            }
        };
        const shipping_amount = shippingAddress?.state ? getShippingCharges(shippingAddress.state) : 0;
        const total_amount = subtotal + shipping_amount;
        return {
            subtotal: Math.round(subtotal * 100) / 100,
            tax_amount: 0,
            shipping_amount,
            total_amount: Math.round(total_amount * 100) / 100
        };
    }
    static async createOrderItems(orderId, items) {
        const orderItems = [];
        for (const item of items) {
            const { data: product } = await supabase_1.supabase
                .from(supabase_1.TABLES.PRODUCTS)
                .select('name, image_url, price')
                .eq('id', item.product_id)
                .single();
            if (product) {
                const unit_price = product.price;
                const total_price = unit_price * item.quantity;
                const { data: orderItem, error } = await supabase_1.supabase
                    .from(supabase_1.TABLES.ORDER_ITEMS)
                    .insert([{
                        order_id: orderId,
                        product_id: item.product_id,
                        product_name: product.name,
                        product_image: product.image_url,
                        quantity: item.quantity,
                        unit_price,
                        total_price,
                        created_at: new Date().toISOString()
                    }])
                    .select()
                    .single();
                if (error) {
                    (0, supabase_1.handleSupabaseError)(error, 'creating order item');
                }
                orderItems.push(orderItem);
            }
        }
        return orderItems;
    }
    static async updateProductStock(items, operation) {
        for (const item of items) {
            const { data: product } = await supabase_1.supabase
                .from(supabase_1.TABLES.PRODUCTS)
                .select('stock_quantity')
                .eq('id', item.product_id)
                .single();
            if (product) {
                const newQuantity = operation === 'increase'
                    ? product.stock_quantity + item.quantity
                    : product.stock_quantity - item.quantity;
                await supabase_1.supabase
                    .from(supabase_1.TABLES.PRODUCTS)
                    .update({
                    stock_quantity: newQuantity,
                    updated_at: new Date().toISOString()
                })
                    .eq('id', item.product_id);
            }
        }
    }
}
exports.OrderModel = OrderModel;
//# sourceMappingURL=Order.js.map