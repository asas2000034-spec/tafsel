'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import { Factory, Package, Briefcase, Wallet } from 'lucide-react';
import { Order } from '@/types';

type Tab = 'orders' | 'catalog' | 'wallet';

export default function FactoryDashboard() {
  const { user, logout } = useApp();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user?.id) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/orders?factoryId=${user?.id}`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Factory className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">لوحة المصنع</h1>
          </div>
          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            خروج
          </button>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'orders'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                <span className="font-medium">الطلبات</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('catalog')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'catalog'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                <span className="font-medium">كتالوجي</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('wallet')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'wallet'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                <span className="font-medium">المحفظة</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'orders' && <OrdersTab orders={orders} />}
        {activeTab === 'catalog' && <CatalogTab />}
        {activeTab === 'wallet' && <WalletTab />}
      </div>
    </div>
  );
}

function OrdersTab({ orders }: { orders: Order[] }) {
  const router = useRouter();

  if (orders.length === 0) {
    return (
      <div className="card text-center py-12">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          لا توجد طلبات جديدة
        </h3>
        <p className="text-gray-600">
          ستظهر الطلبات الجديدة هنا عندما يشتري العملاء منتجاتك
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">الطلبات الجديدة</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            onClick={() => router.push(`/factory/order/${order.id}`)}
            className="card hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Package className="w-6 h-6 text-primary" />
                </div>
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
                <div className={`text-sm px-2 py-1 rounded ${
                  order.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {order.status === 'pending' ? 'جديد' : 'قيد المعالجة'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CatalogTab() {
  const router = useRouter();
  const { user } = useApp();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (user?.id) {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/blank-products?factoryId=${user?.id}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">كتالوج المنتجات</h2>
        <button
          onClick={() => router.push('/factory/add-product')}
          className="btn-primary"
        >
          + إضافة منتج خام جديد
        </button>
      </div>

      {products.length === 0 ? (
        <div className="card text-center py-12">
          <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            لا توجد منتجات في الكتالوج
          </h3>
          <p className="text-gray-600 mb-6">
            أضف منتجاتك الخام ليتمكن المصممون من استخدامها
          </p>
          <button
            onClick={() => router.push('/factory/add-product')}
            className="btn-primary"
          >
            إضافة منتج الآن
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <div>الألوان: {product.colors.join(', ')}</div>
                  <div>المقاسات: {product.sizes.join(', ')}</div>
                </div>
                <div className="text-xl font-bold text-primary">
                  {product.baseCost} TFT
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WalletTab() {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">محفظة المصنع</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <span className="text-gray-700">الأرباح الكلية</span>
          <span className="text-2xl font-bold text-primary">0 TFT</span>
        </div>
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <span className="text-gray-700">الرصيد المتاح للسحب</span>
          <span className="text-2xl font-bold text-gray-900">0 TFT</span>
        </div>
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <span className="text-gray-700">عدد الطلبات المنفذة</span>
          <span className="text-2xl font-bold text-gray-900">0</span>
        </div>
      </div>
    </div>
  );
}
