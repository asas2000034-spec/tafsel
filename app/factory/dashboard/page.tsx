'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaClipboardList, FaBox, FaWallet } from 'react-icons/fa'

export default function FactoryDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'orders' | 'catalog' | 'wallet'>('orders')
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    // تحميل الطلبات من localStorage
    const storedOrders = localStorage.getItem('orders')
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم المصنع</h1>
        </div>
      </header>

      {/* شريط التنقل */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-4 border-b-2 ${
                activeTab === 'orders'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600'
              }`}
            >
              <FaClipboardList className="inline ml-2" />
              الطلبات
            </button>
            <button
              onClick={() => setActiveTab('catalog')}
              className={`py-4 px-4 border-b-2 ${
                activeTab === 'catalog'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600'
              }`}
            >
              <FaBox className="inline ml-2" />
              كتالوجي
            </button>
            <button
              onClick={() => setActiveTab('wallet')}
              className={`py-4 px-4 border-b-2 ${
                activeTab === 'wallet'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600'
              }`}
            >
              <FaWallet className="inline ml-2" />
              المحفظة
            </button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-xl font-bold mb-4">الطلبات الجديدة</h2>
            {orders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-600">لا توجد طلبات جديدة</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => router.push(`/factory/order/${order.id}`)}
                    className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-xl transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">طلب جديد #{order.id}</h3>
                        <p className="text-gray-600">{order.productName}</p>
                        <p className="text-sm text-gray-500">تصميم X</p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                        جديد
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'catalog' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">كتالوجي</h2>
              <button
                onClick={() => router.push('/factory/catalog/add')}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
              >
                + إضافة منتج خام جديد
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600">لا توجد منتجات في الكتالوج</p>
            </div>
          </div>
        )}

        {activeTab === 'wallet' && (
          <div>
            <h2 className="text-xl font-bold mb-4">المحفظة</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-sm text-gray-600 mb-2">الرصيد الإجمالي</p>
              <p className="text-3xl font-bold text-gold">0 TFT</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
