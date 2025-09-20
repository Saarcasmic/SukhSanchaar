import React, { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown, Eye, Calendar, User, CreditCard, RefreshCw } from 'lucide-react';
import { useAdmin } from '../../../contexts/AdminContext';
import { OrderModal } from './index';

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  items: Array<{
    product_id: string;
    product_name: string;
    product_image: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  total_amount: number;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  order_status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  payment_method: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

type SortField = 'customer_name' | 'created_at' | 'order_status' | 'payment_status';
type SortDirection = 'asc' | 'desc';
type StatusFilter = 'all' | 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

const OrdersPage: React.FC = () => {
  const { orders, loading, error, updateOrder, fetchOrders } = useAdmin();
  
  // State for filtering and searching
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Modal state
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Manual refresh function (only called when user clicks refresh button)
  const handleRefresh = async () => {
    try {
      await fetchOrders();
    } catch (error) {
      console.error('Failed to refresh orders:', error);
    }
  };

  // Filter and search orders
  const filteredOrders = useMemo(() => {
    let filtered = orders;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(order => 
        order.order_number.toLowerCase().includes(term) ||
        order.customer_name.toLowerCase().includes(term) ||
        (order.razorpay_payment_id && order.razorpay_payment_id.toLowerCase().includes(term))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.order_status === statusFilter);
    }

    return filtered;
  }, [orders, searchTerm, statusFilter]);

  // Sort orders
  const sortedOrders = useMemo(() => {
    return [...filteredOrders].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === 'created_at') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [filteredOrders, sortField, sortDirection]);

  // Paginate orders
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedOrders.slice(startIndex, endIndex);
  }, [sortedOrders, currentPage, itemsPerPage]);

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle order selection
  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Handle order update
  const handleOrderUpdate = async (orderId: string, updates: Partial<Order>) => {
    try {
      await updateOrder(orderId, updates);
      setIsModalOpen(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get payment status badge color
  const getPaymentStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'refunded': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Truncate payment ID
  const truncatePaymentId = (paymentId: string | undefined) => {
    if (!paymentId) return 'N/A';
    return paymentId.length > 6 ? `...${paymentId.slice(-6)}` : paymentId;
  };

  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ayur-red"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p className="font-semibold">Error loading orders</p>
        <p>{error}</p>
        <button
          onClick={fetchOrders}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Orders Management</h1>
        <p className="text-gray-600 text-sm sm:text-base">Manage and track customer orders</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sticky top-0 z-10">
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by order ID, customer name, or payment ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All', count: orders.length },
              { key: 'pending', label: 'Pending', count: orders.filter(o => o.order_status === 'pending').length },
              { key: 'confirmed', label: 'Processing', count: orders.filter(o => o.order_status === 'confirmed').length },
              { key: 'shipped', label: 'Shipped', count: orders.filter(o => o.order_status === 'shipped').length },
              { key: 'delivered', label: 'Delivered', count: orders.filter(o => o.order_status === 'delivered').length },
              { key: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.order_status === 'cancelled').length },
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setStatusFilter(key as StatusFilter)}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  statusFilter === key
                    ? 'bg-ayur-red text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="hidden sm:inline">{label} ({count})</span>
                <span className="sm:hidden">{label}</span>
              </button>
            ))}
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors bg-blue-100 text-blue-700 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <p className="text-sm text-gray-600">
          Showing {paginatedOrders.length} of {sortedOrders.length} orders
        </p>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Items per page:</label>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                  <button
                    onClick={() => handleSort('customer_name')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    Order ID
                    {sortField === 'customer_name' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                  <button
                    onClick={() => handleSort('customer_name')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    Customer
                    {sortField === 'customer_name' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                  <button
                    onClick={() => handleSort('created_at')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    Order Date
                    {sortField === 'created_at' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                  <button
                    onClick={() => handleSort('order_status')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    Order Status
                    {sortField === 'order_status' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-36">
                  <button
                    onClick={() => handleSort('payment_status')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    Payment Status
                    {sortField === 'payment_status' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                  Payment ID
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                  Total
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 sm:px-6 py-4">
                    <button
                      onClick={() => handleOrderClick(order)}
                      className="text-ayur-red hover:text-ayur-red/80 font-medium underline text-sm"
                    >
                      {order.order_number || order.id}
                    </button>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center min-w-0">
                      <User className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{order.customer_name || 'Unknown'}</div>
                        <div className="text-sm text-gray-500 truncate">{order.customer_email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                      <div className="text-sm text-gray-900">
                        <div className="hidden sm:block">{formatDate(order.created_at)}</div>
                        <div className="sm:hidden text-xs">{new Date(order.created_at).toLocaleDateString('en-GB')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeColor(order.order_status || 'pending')}`}>
                      <span className="hidden sm:inline">{(order.order_status || 'pending').charAt(0).toUpperCase() + (order.order_status || 'pending').slice(1)}</span>
                      <span className="sm:hidden">{(order.order_status || 'pending').charAt(0).toUpperCase()}</span>
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPaymentStatusBadgeColor(order.payment_status || 'pending')}`}>
                      <span className="hidden sm:inline">{(order.payment_status || 'pending').charAt(0).toUpperCase() + (order.payment_status || 'pending').slice(1)}</span>
                      <span className="sm:hidden">{(order.payment_status || 'pending').charAt(0).toUpperCase()}</span>
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center">
                      <CreditCard className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span
                        className="text-sm text-gray-900 cursor-help truncate"
                        title={order.razorpay_payment_id || 'N/A'}
                      >
                        {truncatePaymentId(order.razorpay_payment_id)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm font-medium text-gray-900">
                    ₹{order.total_amount || 0}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm font-medium">
                    <button
                      onClick={() => handleOrderClick(order)}
                      className="text-ayur-red hover:text-ayur-red/80 flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="hidden sm:inline">View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="flex items-center text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing page <span className="font-medium">{currentPage}</span> of{' '}
                    <span className="font-medium">{totalPages}</span>
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
                      const page = startPage + i;
                      if (page > totalPages) return null;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`relative inline-flex items-center px-3 py-2 border text-sm font-medium ${
                            page === currentPage
                              ? 'z-10 bg-ayur-red border-ayur-red text-white'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Modal */}
      {isModalOpen && selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedOrder(null);
          }}
          onUpdate={handleOrderUpdate}
        />
      )}
    </div>
  );
};

export default OrdersPage;
