import { Request, Response } from 'express';
import { supabase, TABLES, handleSupabaseError } from '../models/supabase';
import { ApiResponse } from '../types';
import { Database } from '../models/database.types';

// Use Supabase generated types
type Order = Database['public']['Tables']['orders']['Row'];
type OrderItem = Database['public']['Tables']['order_items']['Row'];

export class AdminController {
  /**
   * GET /api/admin/stats
   * Overview of stats (today's orders, total sales, top products)
   */
  static async getStats(req: Request, res: Response): Promise<void> {
    try {
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
      const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString();

      // Get today's orders count
      const { count: todayOrdersCount, error: todayOrdersError } = await supabase
        .from(TABLES.ORDERS)
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startOfDay)
        .lt('created_at', endOfDay);

      if (todayOrdersError) {
        handleSupabaseError(todayOrdersError, 'fetching today orders count');
      }

      // Get today's sales
      const { data: todayOrders, error: todayOrdersDataError } = await supabase
        .from(TABLES.ORDERS)
        .select('total_amount, payment_status')
        .gte('created_at', startOfDay)
        .lt('created_at', endOfDay);

      if (todayOrdersDataError) {
        handleSupabaseError(todayOrdersDataError, 'fetching today orders data');
      }

      const todaySales = todayOrders
        ?.filter(order => order.payment_status === 'paid')
        .reduce((sum, order) => sum + order.total_amount, 0) || 0;

      // Get total orders count
      const { count: totalOrdersCount, error: totalOrdersError } = await supabase
        .from(TABLES.ORDERS)
        .select('*', { count: 'exact', head: true });

      if (totalOrdersError) {
        handleSupabaseError(totalOrdersError, 'fetching total orders count');
      }

      // Get total sales
      const { data: allOrders, error: allOrdersError } = await supabase
        .from(TABLES.ORDERS)
        .select('total_amount, payment_status');

      if (allOrdersError) {
        handleSupabaseError(allOrdersError, 'fetching all orders data');
      }

      const totalSales = allOrders
        ?.filter(order => order.payment_status === 'paid')
        .reduce((sum, order) => sum + order.total_amount, 0) || 0;

      // Get total products count
      const { count: totalProductsCount, error: totalProductsError } = await supabase
        .from(TABLES.PRODUCTS)
        .select('*', { count: 'exact', head: true });

      if (totalProductsError) {
        handleSupabaseError(totalProductsError, 'fetching total products count');
      }

      // Get active products count
      const { count: activeProductsCount, error: activeProductsError } = await supabase
        .from(TABLES.PRODUCTS)
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true)
        .gt('stock_quantity', 0);

      if (activeProductsError) {
        handleSupabaseError(activeProductsError, 'fetching active products count');
      }

      // Get top products by sales
      const { data: topProductsData, error: topProductsError } = await supabase
        .from(TABLES.ORDER_ITEMS)
        .select(`
          product_id,
          product_name,
          quantity,
          total_price,
          products!inner(name, image_url)
        `);

      if (topProductsError) {
        handleSupabaseError(topProductsError, 'fetching top products data');
      }

      // Calculate top products
      const productSales = new Map();
      topProductsData?.forEach(item => {
        const productId = item.product_id;
        if (productSales.has(productId)) {
          const existing = productSales.get(productId);
          productSales.set(productId, {
            product_id: productId,
            product_name: item.product_name,
            total_quantity: existing.total_quantity + item.quantity,
            total_sales: existing.total_sales + item.total_price,
            image_url: item.products?.image_url
          });
        } else {
          productSales.set(productId, {
            product_id: productId,
            product_name: item.product_name,
            total_quantity: item.quantity,
            total_sales: item.total_price,
            image_url: item.products?.image_url
          });
        }
      });

      const topProducts = Array.from(productSales.values())
        .sort((a, b) => b.total_sales - a.total_sales)
        .slice(0, 5);

      // Get recent orders
      const { data: recentOrders, error: recentOrdersError } = await supabase
        .from(TABLES.ORDERS)
        .select(`
          id,
          order_number,
          customer_name,
          customer_email,
          total_amount,
          order_status,
          payment_status,
          created_at
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      if (recentOrdersError) {
        handleSupabaseError(recentOrdersError, 'fetching recent orders');
      }

      // Get order status distribution
      const { data: orderStatusData, error: orderStatusError } = await supabase
        .from(TABLES.ORDERS)
        .select('order_status');

      if (orderStatusError) {
        handleSupabaseError(orderStatusError, 'fetching order status data');
      }

      const orderStatusDistribution = orderStatusData?.reduce((acc, order) => {
        acc[order.order_status] = (acc[order.order_status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const stats = {
        overview: {
          today_orders: todayOrdersCount || 0,
          today_sales: Math.round(todaySales * 100) / 100,
          total_orders: totalOrdersCount || 0,
          total_sales: Math.round(totalSales * 100) / 100,
          total_products: totalProductsCount || 0,
          active_products: activeProductsCount || 0
        },
        top_products: topProducts,
        recent_orders: recentOrders || [],
        order_status_distribution: orderStatusDistribution
      };

      const response: ApiResponse = {
        success: true,
        data: stats
      };

      res.json(response);
    } catch (error) {
      console.error('Error in getStats:', error);
      throw error;
    }
  }

  /**
   * GET /api/admin/dashboard
   * Extended dashboard data with charts and analytics
   */
  static async getDashboard(req: Request, res: Response): Promise<void> {
    try {
      const { period = '7d' } = req.query;
      
      // Calculate date range based on period
      const now = new Date();
      let startDate: Date;
      
      switch (period) {
        case '1d':
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case '7d':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case '30d':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case '90d':
          startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      }

      // Get sales data for the period
      const { data: salesData, error: salesError } = await supabase
        .from(TABLES.ORDERS)
        .select('total_amount, payment_status, created_at')
        .gte('created_at', startDate.toISOString())
        .eq('payment_status', 'paid')
        .order('created_at', { ascending: true });

      if (salesError) {
        handleSupabaseError(salesError, 'fetching sales data');
      }

      // Get orders data for the period
      const { data: ordersData, error: ordersError } = await supabase
        .from(TABLES.ORDERS)
        .select('order_status, created_at')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: true });

      if (ordersError) {
        handleSupabaseError(ordersError, 'fetching orders data');
      }

      // Process data for charts
      const salesChartData = this.processChartData(salesData || [], 'total_amount', 'sales');
      const ordersChartData = this.processChartData(ordersData || [], 'created_at', 'orders');

      const dashboard = {
        period,
        sales_chart: salesChartData,
        orders_chart: ordersChartData,
        total_sales: salesData?.reduce((sum, order) => sum + order.total_amount, 0) || 0,
        total_orders: ordersData?.length || 0
      };

      const response: ApiResponse = {
        success: true,
        data: dashboard
      };

      res.json(response);
    } catch (error) {
      console.error('Error in getDashboard:', error);
      throw error;
    }
  }

  /**
   * Process data for chart visualization
   */
  private static processChartData(
    data: any[], 
    valueField: string, 
    type: 'sales' | 'orders'
  ): Array<{ date: string; value: number }> {
    const chartData: { [key: string]: number } = {};

    data.forEach(item => {
      const date = new Date(item.created_at).toISOString().split('T')[0];
      
      if (type === 'sales') {
        chartData[date] = (chartData[date] || 0) + item[valueField];
      } else {
        chartData[date] = (chartData[date] || 0) + 1;
      }
    });

    return Object.entries(chartData)
      .map(([date, value]) => ({ date, value: Math.round(value * 100) / 100 }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }
}
