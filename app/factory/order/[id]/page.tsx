'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function OrderFulfillmentPage() {
  const params = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<any>(null)
  const [status, setStatus] = useState('pending')

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    const foundOrder = orders.find((o: any) => o.id.toString() === params.id)
    if (foundOrder) {
      setOrder(foundOrder)
      setStatus(foundOrder.status || 'pending')
    }
  }, [params.id])

  const handleStatusUpdate = (newStatus: string) => {
    setStatus(newStatus)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    const updatedOrders = orders.map((o: any) =>
      o.id.toString() === params.id ? { ...o, status: newStatus } : o
    )
    localStorage.setItem('orders', JSON.stringify(updatedOrders))
    
    if (newStatus === 'shipped') {
      // توزيع الأرباح (محاكاة)
      alert('تم توزيع الأرباح تلقائياً!')
    }
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>جارٍ التحميل...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">تنفيذ الطلب #{order.id}</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* معلومات الطلب */}
          <div>
            <h2 className="text-xl font-bold mb-4">معلومات الطلب</h2>
            <div className="space-y-2">
              <p><span className="font-semibold">المنتج:</span> {order.productName}</p>
              <p><span className="font-semibold">السعر:</span> {order.price} TFT</p>
            </div>
          </div>

          {/* عنوان الشحن */}
          <div>
            <h2 className="text-xl font-bold mb-4">عنوان الشحن</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>الرياض، حي النرجس</p>
              <p>شارع الملك فهد</p>
              <p>الرمز البريدي: 12345</p>
            </div>
          </div>

          {/* رابط التصميم */}
          <div>
            <h2 className="text-xl font-bold mb-4">ملف التصميم</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <a
                href="#"
                className="text-primary hover:underline font-semibold"
              >
                🔗 تحميل ملف التصميم للطباعة (رابط آمن)
              </a>
            </div>
          </div>

          {/* الأزرار */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => alert('تم طباعة بوليصة الشحن')}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
            >
              طباعة بوليصة الشحن
            </button>

            {status === 'pending' && (
              <button
                onClick={() => handleStatusUpdate('in_production')}
                className="w-full px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-semibold"
              >
                تأكيد بدء الإنتاج
              </button>
            )}

            {status === 'in_production' && (
              <button
                onClick={() => handleStatusUpdate('shipped')}
                className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold"
              >
                تأكيد الشحن
              </button>
            )}

            {status === 'shipped' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-800 font-semibold">✓ تم تأكيد الشحن</p>
                <p className="text-sm text-green-600 mt-1">تم توزيع الأرباح تلقائياً</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
