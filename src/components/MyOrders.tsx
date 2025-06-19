import { X, Package, Truck, CheckCircle, XCircle, Calendar, MapPin, CreditCard } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import { Order } from '../types/product';

export function MyOrders() {
  const { state, dispatch } = useOrders();

  if (!state.isOrdersOpen) return null;

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return <Package className="h-5 w-5 text-blue-600" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-orange-600" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => dispatch({ type: 'TOGGLE_ORDERS' })} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Package className="h-5 w-5" />
              My Orders
            </h2>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_ORDERS' })}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Orders List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {state.orders.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <Package className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-500 text-sm">Your order history will appear here</p>
              </div>
            ) : (
              <div className="space-y-6">
                {state.orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface OrderCardProps {
  order: Order;
}

function OrderCard({ order }: OrderCardProps) {
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return <Package className="h-4 w-4 text-blue-600" />;
      case 'shipped':
        return <Truck className="h-4 w-4 text-orange-600" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Order Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {getStatusIcon(order.status)}
            <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-900">#{order.id}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formatDate(order.orderDate)}
          </div>
          <span className="font-semibold text-emerald-600">${order.finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Order Items */}
      <div className="space-y-3 mb-4">
        {order.items.slice(0, 2).map((item) => (
          <div key={item.id} className="flex gap-3">
            <img
              src={item.image}
              alt={item.title}
              className="w-12 h-12 object-contain rounded-md flex-shrink-0 bg-gray-50"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-slate-900 text-sm line-clamp-1">
                {item.title}
              </h4>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-600">Qty: {item.quantity}</span>
                <span className="text-sm font-semibold text-emerald-600">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
        {order.items.length > 2 && (
          <div className="text-sm text-gray-600 text-center py-2 bg-gray-50 rounded">
            +{order.items.length - 2} more item{order.items.length - 2 > 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Order Details */}
      <div className="border-t border-gray-100 pt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>
            {order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.state}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CreditCard className="h-4 w-4" />
          <span className="capitalize">{order.paymentMethod} Payment</span>
        </div>
        {order.estimatedDelivery && order.status !== 'delivered' && order.status !== 'cancelled' && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Truck className="h-4 w-4" />
            <span>Estimated delivery: {order.estimatedDelivery}</span>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="border-t border-gray-100 pt-3 mt-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-gray-600">
          <div>
            <span className="block">Subtotal</span>
            <span className="font-medium">${order.total.toFixed(2)}</span>
          </div>
          <div>
            <span className="block">Shipping</span>
            <span className="font-medium">${order.shipping.toFixed(2)}</span>
          </div>
          <div>
            <span className="block">Tax</span>
            <span className="font-medium">${order.tax.toFixed(2)}</span>
          </div>
          <div>
            <span className="block">Total</span>
            <span className="font-semibold text-emerald-600">${order.finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}