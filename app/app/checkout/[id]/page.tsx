'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import BottomNav from '@/components/BottomNav'

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const { wallet, deductFromWallet } = useStore()
  const [orderPlaced, setOrderPlaced] = useState(false)

  const product = {
    id: params.id,
    name: 'تي شيرت بريميوم',
    price: 200,
  }

  useEffect(() => {
    // تحميل بيانات المحفظة
    const storedWallet = localStorage.getItem('wallet')
    if (storedWallet) {
      useStore.getState().updateWallet(JSON.parse(storedWallet))
    }
  }, [])

  const handleConfirm = () => {
    if (wallet.totalBalance >= product.price) {
      deductFromWallet(product.price)
      // حفظ الطلب
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      orders.push({
        id: Date.now(),
        productId: product.id,
        productName: product.name,
        price: product.price,
        status: 'pending',
        date: new Date().toISOString(),
      })
      localStorage.setItem('orders', JSON.stringify(orders))
      
      // حفظ المحفظة المحدثة
      localStorage.setItem('wallet', JSON.stringify(useStore.getState().wallet))
      
      setOrderPlaced(true)
      setTimeout(() => {
        router.push('/app/mall')
      }, 2000)
    }
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold mb-2">تم تأكيد الطلب بنجاح!</h2>
          <p className="text-gray-600">سيتم توجيهك إلى المول...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">تأكيد الدفع</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <h2 className="text-xl font-bold mb-4">ملخص الطلب</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">المنتج:</span>
              <span className="font-semibold">{product.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">المبلغ الإجمالي:</span>
              <span className="font-bold text-gold">{product.price} TFT</span>
            </div>
          </div>

          {wallet.lockedBalance > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800">
                ⚠️ سيتم الخصم من رصيدك المقفل ({wallet.lockedBalance.toFixed(2)} TFT) أولاً.
              </p>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex justify-between mb-2">
              <span>الرصيد المتاح:</span>
              <span className="font-semibold">{wallet.totalBalance.toFixed(2)} TFT</span>
            </div>
            {wallet.totalBalance < product.price && (
              <p className="text-red-600 text-sm">الرصيد غير كافٍ</p>
            )}
          </div>

          <button
            onClick={handleConfirm}
            disabled={wallet.totalBalance < product.price}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition ${
              wallet.totalBalance >= product.price
                ? 'bg-primary text-white hover:bg-primary-dark'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            تأكيد الدفع
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
