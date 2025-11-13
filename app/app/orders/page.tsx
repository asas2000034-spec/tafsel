'use client';

import { useEffect, useState } from 'react';
import { useApp } from '@/lib/context';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Order } from '@/types';
import { Package, Clock, Truck, CheckCircle } from 'lucide-react';

export default function OrdersPage() {
  const { user } = useApp();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/orders?customerId=${user?.id}`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'processing':
        return <Package className="w-5 h-5 text-blue-600" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-600" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'قيد الانتظار';
      case 'processing':
        return 'قيد التنفيذ';
      case 'shipped':
        return 'تم الشحن';
      case 'delivered':
        return 'تم التوصيل';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">طلباتي</h2>
          <p className="text-gray-600">تتبع جميع طلباتك</p>
        </div>

        {orders.length === 0 ? (
          <div className="card text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              لا توجد طلبات بعد
            </h3>
            <p className="text-gray-600">ابدأ بالتسوق من المول!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="font-bold text-gray-900">
                        طلب #{order.id}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString('ar-SA')}
                      </p>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold text-primary">
                      {order.total} TFT
                    </div>
                    <div className="text-sm text-gray-600">
                      {getStatusText(order.status)}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  عنوان الشحن: {order.shippingAddress}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
