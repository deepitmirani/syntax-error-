import React, { useState } from 'react';
import { Package, Eye, RotateCcw, Clock, MapPin, Search } from 'lucide-react';
import { useOrder } from '../../../context/OrderContext';
import { OrderStatusBadge } from '../../common/Badge';
import type { Order } from '../../../types';

export const OrderHistoryPage: React.FC = () => {
  const { orders, openTrackingModal, reorderItems } = useOrder();
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  const [searchHistory, setSearchHistory] = useState('');

  const filteredOrders = orders.filter((order) => {
    // Tab filter
    if (activeTab === 'active' && (order.status === 'completed' || order.status === 'cancelled')) return false;
    if (activeTab === 'completed' && order.status !== 'completed') return false;

    // Search filter
    if (searchHistory.trim()) {
      const q = searchHistory.toLowerCase();
      const matchId = order.id.toLowerCase().includes(q);
      const matchToken = order.token.toLowerCase().includes(q);
      const matchItem = order.items.some((i) => i.foodItem.name.toLowerCase().includes(q));
      if (!matchId && !matchToken && !matchItem) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-campus-purple-100 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-campus-purple-100 text-campus-purple-900 flex items-center justify-center">
              <Package className="w-6 h-6 text-campus-purple-800" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-campus-charcoal-900 font-display">
                Order History 📦
              </h1>
              <p className="text-xs sm:text-sm text-campus-charcoal-500 mt-0.5">
                Keep tabs on all your past and live cafeteria orders
              </p>
            </div>
          </div>

          {/* Search bar inside history */}
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-campus-charcoal-400" />
            <input
              type="text"
              value={searchHistory}
              onChange={(e) => setSearchHistory(e.target.value)}
              placeholder="Search by Order ID or dish..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-campus-cream-50 border border-campus-purple-100 rounded-xl text-campus-charcoal-900 focus:outline-none focus:ring-2 focus:ring-campus-purple-400"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-6 border-b border-campus-purple-50 pb-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-campus-purple-800 text-white shadow-sm'
                : 'text-campus-charcoal-600 hover:bg-campus-purple-50'
            }`}
          >
            All Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'active'
                ? 'bg-campus-purple-800 text-white shadow-sm'
                : 'text-campus-charcoal-600 hover:bg-campus-purple-50'
            }`}
          >
            Active Tickets ({orders.filter((o) => o.status !== 'completed' && o.status !== 'cancelled').length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'completed'
                ? 'bg-campus-purple-800 text-white shadow-sm'
                : 'text-campus-charcoal-600 hover:bg-campus-purple-50'
            }`}
          >
            Completed ({orders.filter((o) => o.status === 'completed').length})
          </button>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-campus-purple-100 shadow-soft">
          <div className="w-16 h-16 rounded-full bg-campus-purple-50 flex items-center justify-center text-3xl mx-auto mb-3">
            📦
          </div>
          <h3 className="text-lg font-black text-campus-charcoal-900 font-display">
            No orders found
          </h3>
          <p className="text-xs text-campus-charcoal-500 mt-1 max-w-sm mx-auto">
            You don't have any orders matching this tab or search query.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order: Order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-campus-purple-100 shadow-soft hover:shadow-soft-lg transition-all"
            >
              {/* Order Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-campus-purple-50">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-campus-cream-200 border border-campus-purple-200 flex items-center justify-center font-display font-black text-campus-purple-900 text-base">
                    {order.token}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-sm text-campus-charcoal-900">
                        {order.id}
                      </span>
                      <OrderStatusBadge status={order.status} />
                      {order.fulfillmentType === 'class_delivery' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-campus-mango-100 text-campus-charcoal-900 border border-campus-mango-300 px-2 py-0.5 rounded-md">
                          🏫 Deliver to Class: {order.deliveryLocation?.building || 'Campus'} ({order.deliveryLocation?.classroom || ''})
                        </span>
                      ) : order.fulfillmentType === 'scheduled' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-md">
                          📅 Pre-Order: {order.scheduledDate || 'Today'} at {order.scheduledTime || ''}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-campus-purple-50 text-campus-purple-800 border border-campus-purple-200 px-2 py-0.5 rounded-md">
                          🛍️ Pickup from Canteen
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-campus-charcoal-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-campus-charcoal-400" />
                      {order.orderTime}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="text-lg font-black text-campus-purple-950 font-display">
                    ₹{order.totalAmount}
                  </span>
                </div>
              </div>

              {/* Order Items Details */}
              <div className="py-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                {order.items.map((it, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 bg-campus-cream-50 p-2 rounded-xl border border-campus-purple-50">
                    <img
                      src={it.foodItem.image}
                      alt={it.foodItem.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-campus-charcoal-800 truncate">{it.foodItem.name}</p>
                      <span className="text-[11px] text-campus-charcoal-500">
                        {it.quantity}x • ₹{it.foodItem.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer & Actions */}
              <div className="pt-3 border-t border-campus-purple-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-campus-charcoal-500">
                  <MapPin className="w-3.5 h-3.5 text-campus-coral-500" />
                  <span className="font-semibold">{order.pickupCounter}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openTrackingModal(order)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-campus-purple-200 bg-campus-purple-50 hover:bg-campus-purple-100 text-campus-purple-900 font-bold transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-campus-purple-700" />
                    <span>Track Ticket</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => reorderItems(order)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-campus-purple-800 hover:bg-campus-purple-700 text-white font-bold transition-all shadow-sm"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-campus-mango-400" />
                    <span>Order Again</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
