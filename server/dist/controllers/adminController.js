"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const supabase_1 = require("../models/supabase");
class AdminController {
    static async getStats(req, res) {
        try {
            const today = new Date();
            const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
            const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString();
            const { count: todayOrdersCount, error: todayOrdersError } = await supabase_1.supabase
                .from(supabase_1.TABLES.ORDERS)
                .select('*', { count: 'exact', head: true })
                .gte('created_at', startOfDay)
                .lt('created_at', endOfDay);
            if (todayOrdersError) {
                (0, supabase_1.handleSupabaseError)(todayOrdersError, 'fetching today orders count');
            }
            const { data: todayOrders, error: todayOrdersDataError } = await supabase_1.supabase
                .from(supabase_1.TABLES.ORDERS)
                .select('total_amount, payment_status')
                .gte('created_at', startOfDay)
                .lt('created_at', endOfDay);
            if (todayOrdersDataError) {
                (0, supabase_1.handleSupabaseError)(todayOrdersDataError, 'fetching today orders data');
            }
            const todaySales = todayOrders
                ?.filter(order => order.payment_status === 'paid')
                .reduce((sum, order) => sum + order.total_amount, 0) || 0;
            const { count: totalOrdersCount, error: totalOrdersError } = await supabase_1.supabase
                .from(supabase_1.TABLES.ORDERS)
                .select('*', { count: 'exact', head: true });
            if (totalOrdersError) {
                (0, supabase_1.handleSupabaseError)(totalOrdersError, 'fetching total orders count');
            }
            const { data: allOrders, error: allOrdersError } = await supabase_1.supabase
                .from(supabase_1.TABLES.ORDERS)
                .select('total_amount, payment_status');
            if (allOrdersError) {
                (0, supabase_1.handleSupabaseError)(allOrdersError, 'fetching all orders data');
            }
            const totalSales = allOrders
                ?.filter(order => order.payment_status === 'paid')
                .reduce((sum, order) => sum + order.total_amount, 0) || 0;
            const { count: totalProductsCount, error: totalProductsError } = await supabase_1.supabase
                .from(supabase_1.TABLES.PRODUCTS)
                .select('*', { count: 'exact', head: true });
            if (totalProductsError) {
                (0, supabase_1.handleSupabaseError)(totalProductsError, 'fetching total products count');
            }
            const { count: activeProductsCount, error: activeProductsError } = await supabase_1.supabase
                .from(supabase_1.TABLES.PRODUCTS)
                .select('*', { count: 'exact', head: true })
                .eq('is_active', true)
                .gt('stock_quantity', 0);
            if (activeProductsError) {
                (0, supabase_1.handleSupabaseError)(activeProductsError, 'fetching active products count');
            }
            const { data: topProductsData, error: topProductsError } = await supabase_1.supabase
                .from(supabase_1.TABLES.ORDER_ITEMS)
                .select(`
          product_id,
          product_name,
          quantity,
          total_price,
          products!inner(name, image_url)
        `);
            if (topProductsError) {
                (0, supabase_1.handleSupabaseError)(topProductsError, 'fetching top products data');
            }
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
                }
                else {
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
            const { data: recentOrders, error: recentOrdersError } = await supabase_1.supabase
                .from(supabase_1.TABLES.ORDERS)
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
                (0, supabase_1.handleSupabaseError)(recentOrdersError, 'fetching recent orders');
            }
            const { data: orderStatusData, error: orderStatusError } = await supabase_1.supabase
                .from(supabase_1.TABLES.ORDERS)
                .select('order_status');
            if (orderStatusError) {
                (0, supabase_1.handleSupabaseError)(orderStatusError, 'fetching order status data');
            }
            const orderStatusDistribution = orderStatusData?.reduce((acc, order) => {
                acc[order.order_status] = (acc[order.order_status] || 0) + 1;
                return acc;
            }, {}) || {};
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
            const response = {
                success: true,
                data: stats
            };
            res.json(response);
        }
        catch (error) {
            console.error('Error in getStats:', error);
            throw error;
        }
    }
    static async getDashboard(req, res) {
        try {
            const { period = '7d' } = req.query;
            const now = new Date();
            let startDate;
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
            const { data: salesData, error: salesError } = await supabase_1.supabase
                .from(supabase_1.TABLES.ORDERS)
                .select('total_amount, payment_status, created_at')
                .gte('created_at', startDate.toISOString())
                .eq('payment_status', 'paid')
                .order('created_at', { ascending: true });
            if (salesError) {
                (0, supabase_1.handleSupabaseError)(salesError, 'fetching sales data');
            }
            const { data: ordersData, error: ordersError } = await supabase_1.supabase
                .from(supabase_1.TABLES.ORDERS)
                .select('order_status, created_at')
                .gte('created_at', startDate.toISOString())
                .order('created_at', { ascending: true });
            if (ordersError) {
                (0, supabase_1.handleSupabaseError)(ordersError, 'fetching orders data');
            }
            const salesChartData = this.processChartData(salesData || [], 'total_amount', 'sales');
            const ordersChartData = this.processChartData(ordersData || [], 'created_at', 'orders');
            const dashboard = {
                period,
                sales_chart: salesChartData,
                orders_chart: ordersChartData,
                total_sales: salesData?.reduce((sum, order) => sum + order.total_amount, 0) || 0,
                total_orders: ordersData?.length || 0
            };
            const response = {
                success: true,
                data: dashboard
            };
            res.json(response);
        }
        catch (error) {
            console.error('Error in getDashboard:', error);
            throw error;
        }
    }
    static processChartData(data, valueField, type) {
        const chartData = {};
        data.forEach(item => {
            const date = new Date(item.created_at).toISOString().split('T')[0];
            if (type === 'sales') {
                chartData[date] = (chartData[date] || 0) + item[valueField];
            }
            else {
                chartData[date] = (chartData[date] || 0) + 1;
            }
        });
        return Object.entries(chartData)
            .map(([date, value]) => ({ date, value: Math.round(value * 100) / 100 }))
            .sort((a, b) => a.date.localeCompare(b.date));
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=adminController.js.map