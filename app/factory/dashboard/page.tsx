'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaClipboardList, FaBox, FaWallet } from 'react-icons/fa'

export default function FactoryDashboard() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('orders')
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (user) {
      const userData = JSON.parse(user)
      if (userData.role !== 'factory') {
        router.push('/')
        return
      }
      setCurrentUser(userData)
    } else {
      router.push('/login')
      return
    }

    // جلب الطلبات
    const ordersData = localStorage.getItem('factoryOrders')
    if (ordersData) {
      setOrders(JSON.parse(ordersData))
    }
  }, [router])

  if (!currentUser) {
    return <div>جاري التحميل...</div>
  }

  const newOrders = orders.filter(o => o.status === 'new')
  const processingOrders = orders.filter(o => o.status === 'processing')
  const shippedOrders = orders.filter(o => o.status === 'shipped')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">تفصيل - لوحة تحكم المصنع</h1>
          <button
            onClick={() => {
              localStorage.removeItem('currentUser')
              router.push('/')
            }}
            className="text-gray-600 hover:text-indigo-600"
          >
            تسجيل الخروج
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-6 border-b-2 ${
                activeTab === 'orders'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-indigo-600'
              }`}
            >
              <FaClipboardList className="inline ml-2" />
              الطلبات
            </button>
            <Link
              href="/factory/catalog"
              className={`py-4 px-6 border-b-2 ${
                activeTab === 'catalog'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-indigo-600'
              }`}
            >
              <FaBox className="inline ml-2" />
              كتالوجي
            </Link>
            <button
              onClick={() => setActiveTab('wallet')}
              className={`py-4 px-6 border-b-2 ${
                activeTab === 'wallet'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-indigo-600'
              }`}
            >
              <FaWallet className="inline ml-2" />
              المحفظة
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">الطلبات الجديدة</h2>
            {newOrders.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <p className="text-gray-600 text-lg">لا توجد طلبات جديدة</p>
              </div>
            ) : (
              <div className="space-y-4">
                {newOrders.map((order) => (
                  <Link key={order.id} href={`/factory/order/${order.id}`}>
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">طلب جديد #{order.id}</h3>
                          <p className="text-gray-600">{order.productName}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            {new Date(order.date).toLocaleDateString('ar-SA')}
                          </p>
                        </div>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          جديد
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'wallet' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">المحفظة</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <p className="text-gray-600 mb-2">الرصيد الإجمالي</p>
              <p className="text-4xl font-bold text-indigo-600">0 TFT</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
