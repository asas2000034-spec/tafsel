'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { FaTruck, FaCheckCircle, FaDownload } from 'react-icons/fa'

export default function OrderFulfillmentPage() {
  const params = useParams()
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [order, setOrder] = useState<any>(null)

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

    // جلب بيانات الطلب
    const orders = JSON.parse(localStorage.getItem('factoryOrders') || '[]')
    const foundOrder = orders.find((o: any) => o.id === parseInt(params.id as string))
    if (foundOrder) {
      setOrder(foundOrder)
    } else {
      router.push('/factory/dashboard')
    }
  }, [params, router])

  const handleStatusChange = (newStatus: string) => {
    if (!order) return

    const orders = JSON.parse(localStorage.getItem('factoryOrders') || '[]')
    const updatedOrders = orders.map((o: any) =>
      o.id === order.id ? { ...o, status: newStatus } : o
    )
    localStorage.setItem('factoryOrders', JSON.stringify(updatedOrders))

    // تحديث طلبات العميل أيضاً
    const customerOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    const updatedCustomerOrders = customerOrders.map((o: any) =>
      o.id === order.id ? { ...o, status: newStatus === 'shipped' ? 'completed' : 'processing' } : o
    )
    localStorage.setItem('orders', JSON.stringify(updatedCustomerOrders))

    if (newStatus === 'shipped') {
      alert('تم تأكيد الشحن! سيتم توزيع الأرباح تلقائياً.')
      router.push('/factory/dashboard')
    } else {
      setOrder({ ...order, status: newStatus })
    }
  }

  if (!currentUser || !order) {
    return <div>جاري التحميل...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-indigo-600">تنفيذ الطلب #{order.id}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">{order.productName}</h2>
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm ${
                order.status === 'new' ? 'bg-green-100 text-green-800' :
                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {order.status === 'new' ? 'جديد' :
                 order.status === 'processing' ? 'قيد المعالجة' :
                 'تم الشحن'}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold mb-4">عنوان الشحن</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">العميل: {order.customerName || 'عميل تفصيل'}</p>
              <p className="text-gray-700">العنوان: {order.shippingAddress || 'سيتم إضافة العنوان لاحقاً'}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold mb-4">ملف التصميم</h3>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              <FaDownload />
              تحميل ملف التصميم للطباعة
            </a>
            <p className="text-sm text-gray-500 mt-2">رابط آمن للتحميل</p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex gap-4">
              {order.status === 'new' && (
                <>
                  <button
                    onClick={() => handleStatusChange('processing')}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <FaCheckCircle />
                    تأكيد بدء الإنتاج
                  </button>
                </>
              )}
              {order.status === 'processing' && (
                <button
                  onClick={() => handleStatusChange('shipped')}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  <FaTruck />
                  تأكيد الشحن
                </button>
              )}
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                طباعة بوليصة الشحن
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
