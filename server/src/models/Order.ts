import { supabase, TABLES, handleSupabaseError } from './supabase';
import { Order, CreateOrderRequest, UpdateOrderRequest, OrderQueryParams, PaginatedResponse, OrderItem } from '../types';

export class OrderModel {
  /**
   * Get all orders with pagination and filters (Admin only)
   */
  static async getAll(queryParams: OrderQueryParams = {}): Promise<PaginatedResponse<Order>> {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        payment_status,
        customer_email,
        date_from,
        date_to
      } = queryParams;

      let query = supabase
        .from(TABLES.ORDERS)
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

      // Apply filters
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

      // Apply sorting (newest first)
      query = query.order('created_at', { ascending: false });

      // Apply pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) {
        handleSupabaseError(error, 'fetching orders');
      }

      // Debug: Log the structure of returned data (remove in production)
      // console.log('Orders data structure:', JSON.stringify(data?.[0], null, 2));

      // Transform the data to ensure order_items is properly structured
      const transformedData = (data || []).map((order: any) => ({
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
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  /**
   * Get a single order by ID
   */
  static async getById(id: string): Promise<Order | null> {
    try {
      const { data, error } = await supabase
        .from(TABLES.ORDERS)
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
          return null; // Order not found
        }
        handleSupabaseError(error, 'fetching order');
      }

      // Transform the data to ensure order_items is properly structured
      return data ? {
        ...(data as any),
        items: (data as any).order_items || []
      } : null as any;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }

  /**
   * Get order by order number
   */
  static async getByOrderNumber(orderNumber: string): Promise<Order | null> {
    try {
      const { data, error } = await supabase
        .from(TABLES.ORDERS)
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
          return null; // Order not found
        }
        handleSupabaseError(error, 'fetching order by number');
      }

      // Transform the data to ensure order_items is properly structured
      return data ? {
        ...(data as any),
        items: (data as any).order_items || []
      } : null as any;
    } catch (error) {
      console.error('Error fetching order by number:', error);
      throw error;
    }
  }

  /**
   * Create a new order
   */
  static async create(orderData: CreateOrderRequest): Promise<Order> {
    try {
      // Generate order number
      const orderNumber = await this.generateOrderNumber();

      // Calculate totals
      const { subtotal, tax_amount, shipping_amount, total_amount } = await this.calculateOrderTotals(orderData.items);

      // Create order
      const { data: order, error: orderError } = await supabase
        .from(TABLES.ORDERS)
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
        }] as any)
        .select()
        .single();

      if (orderError) {
        handleSupabaseError(orderError, 'creating order');
      }

      // Create order items
      const orderItems = await this.createOrderItems((order as any)!.id, orderData.items);
      
      // Update stock quantities
      await this.updateProductStock(orderData.items, 'decrease');

      return {
        ...(order as any),
        items: orderItems
      };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  /**
   * Update an order
   */
  static async update(id: string, updateData: UpdateOrderRequest): Promise<Order> {
    try {
      const { data, error } = await (supabase as any)
        .from(TABLES.ORDERS)
        .update({
          ...(updateData as any),
          updated_at: new Date().toISOString()
        } as any)
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
        handleSupabaseError(error, 'updating order');
      }

      // Transform the data to ensure order_items is properly structured
      return data ? {
        ...(data as any),
        items: (data as any).order_items || []
      } : data;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }

  /**
   * Delete an order
   */
  static async delete(id: string): Promise<boolean> {
    try {
      // Get order items to restore stock
      const order = await this.getById(id);
      if (order && order.items && Array.isArray(order.items)) {
        const items = order.items.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity
        }));
        await this.updateProductStock(items, 'increase');
      }

      // Delete order items first
      await supabase
        .from(TABLES.ORDER_ITEMS)
        .delete()
        .eq('order_id', id);

      // Delete order
      const { error } = await supabase
        .from(TABLES.ORDERS)
        .delete()
        .eq('id', id);

      if (error) {
        handleSupabaseError(error, 'deleting order');
      }

      return true;
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }

  /**
   * Update order payment details
   */
  static async updatePaymentDetails(
    orderId: string, 
    razorpayOrderId: string, 
    razorpayPaymentId: string, 
    razorpaySignature: string
  ): Promise<Order> {
    try {
      const { data, error } = await (supabase as any)
        .from(TABLES.ORDERS)
        .update({
          razorpay_order_id: razorpayOrderId,
          razorpay_payment_id: razorpayPaymentId,
          razorpay_signature: razorpaySignature,
          payment_status: 'paid',
          order_status: 'confirmed',
          updated_at: new Date().toISOString()
        } as any)
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
        handleSupabaseError(error, 'updating payment details');
      }

      // Transform the data to ensure order_items is properly structured
      return data ? {
        ...(data as any),
        items: (data as any).order_items || []
      } : data;
    } catch (error) {
      console.error('Error updating payment details:', error);
      throw error;
    }
  }

  /**
   * Generate unique order number
   */
  private static async generateOrderNumber(): Promise<string> {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `SS${timestamp.slice(-6)}${random}`;
  }

  /**
   * Calculate order totals
   */
  private static async calculateOrderTotals(items: { product_id: string; quantity: number }[]): Promise<{
    subtotal: number;
    tax_amount: number;
    shipping_amount: number;
    total_amount: number;
  }> {
    let subtotal = 0;

    for (const item of items) {
      const { data: product } = await supabase
        .from(TABLES.PRODUCTS)
        .select('price')
        .eq('id', item.product_id)
        .single();

      if (product) {
        subtotal += (product as any).price * item.quantity;
      }
    }

    // Calculate tax (18% GST)
    const tax_rate = 0.18;
    const tax_amount = subtotal * tax_rate;

    // Calculate shipping (free above ₹500, otherwise ₹50)
    const shipping_amount = subtotal >= 500 ? 0 : 50;

    const total_amount = subtotal + tax_amount + shipping_amount;

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      tax_amount: Math.round(tax_amount * 100) / 100,
      shipping_amount,
      total_amount: Math.round(total_amount * 100) / 100
    };
  }

  /**
   * Create order items
   */
  private static async createOrderItems(orderId: string, items: { product_id: string; quantity: number }[]): Promise<OrderItem[]> {
    const orderItems: OrderItem[] = [];

    for (const item of items) {
      const { data: product } = await supabase
        .from(TABLES.PRODUCTS)
        .select('name, image_url, price')
        .eq('id', item.product_id)
        .single();

      if (product) {
        const unit_price = (product as any).price;
        const total_price = unit_price * item.quantity;

        const { data: orderItem, error } = await supabase
          .from(TABLES.ORDER_ITEMS)
          .insert([{
            order_id: orderId,
            product_id: item.product_id,
            product_name: (product as any).name,
            product_image: (product as any).image_url,
            quantity: item.quantity,
            unit_price,
            total_price,
            created_at: new Date().toISOString()
          }] as any)
          .select()
          .single();

        if (error) {
          handleSupabaseError(error, 'creating order item');
        }

        orderItems.push(orderItem as any);
      }
    }

    return orderItems;
  }

  /**
   * Update product stock quantities
   */
  private static async updateProductStock(
    items: { product_id: string; quantity: number }[], 
    operation: 'increase' | 'decrease'
  ): Promise<void> {
    for (const item of items) {
      const { data: product } = await supabase
        .from(TABLES.PRODUCTS)
        .select('stock_quantity')
        .eq('id', item.product_id)
        .single();

      if (product) {
        const newQuantity = operation === 'increase' 
          ? (product as any).stock_quantity + item.quantity
          : (product as any).stock_quantity - item.quantity;

        await (supabase as any)
          .from(TABLES.PRODUCTS)
          .update({ 
            stock_quantity: newQuantity,
            updated_at: new Date().toISOString()
          } as any)
          .eq('id', item.product_id);
      }
    }
  }
}
