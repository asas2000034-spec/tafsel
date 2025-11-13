'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import BottomNav from '@/components/BottomNav'
import { FaLock, FaUnlock } from 'react-icons/fa'

export default function WalletPage() {
  const router = useRouter()
  const { wallet, updateWallet } = useStore()
  const [showTopUp, setShowTopUp] = useState(false)

  useEffect(() => {
    // تحميل بيانات المحفظة من localStorage
    const storedWallet = localStorage.getItem('wallet')
    if (storedWallet) {
      updateWallet(JSON.parse(storedWallet))
    }
  }, [updateWallet])

  const handleTopUp = () => {
    setShowTopUp(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">المحفظة</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-4">
          {/* إجمالي الرصيد */}
          <div className="bg-gradient-to-r from-gold to-yellow-400 rounded-lg p-6 text-white shadow-lg">
            <p className="text-sm mb-2">إجمالي الرصيد</p>
            <p className="text-4xl font-bold">{wallet.totalBalance.toFixed(2)} TFT</p>
          </div>

          {/* الرصيد الحر */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FaUnlock className="text-green-500" />
                <p className="text-lg font-semibold">الرصيد الحر</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">{wallet.freeBalance.toFixed(2)} TFT</p>
            </div>
          </div>

          {/* الرصيد المقفل */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FaLock className="text-orange-500" />
                <p className="text-lg font-semibold">الرصيد المقفل</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">{wallet.lockedBalance.toFixed(2)} TFT</p>
            </div>
            <p className="text-sm text-gray-500 mt-2">للاستخدام داخل المنصة فقط</p>
          </div>

          {/* زر الشحن */}
          <button
            onClick={handleTopUp}
            className="w-full bg-primary text-white py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition shadow-lg"
          >
            + شحن المحفظة (Top Up)
          </button>
        </div>
      </main>

      {/* Modal خيارات الشحن */}
      {showTopUp && (
        <TopUpModal
          onClose={() => setShowTopUp(false)}
          onSuccess={() => {
            setShowTopUp(false)
            // تحديث localStorage
            localStorage.setItem('wallet', JSON.stringify(useStore.getState().wallet))
          }}
        />
      )}

      <BottomNav />
    </div>
  )
}

function TopUpModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const router = useRouter()
  const { addToWallet } = useStore()
  const [amount, setAmount] = useState('')
  const [selectedMethod, setSelectedMethod] = useState<'normal' | 'bnpl' | null>(null)

  const handleSubmit = () => {
    const numAmount = parseFloat(amount)
    if (numAmount > 0) {
      addToWallet(numAmount, selectedMethod === 'bnpl')
      onSuccess()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">خيارات الشحن</h2>

        <div className="space-y-4 mb-6">
          <button
            onClick={() => setSelectedMethod('normal')}
            className={`w-full p-4 border-2 rounded-lg text-right ${
              selectedMethod === 'normal'
                ? 'border-primary bg-blue-50'
                : 'border-gray-300 hover:border-primary'
            }`}
          >
            <p className="font-semibold">شحن عادي (Mada / Apple Pay)</p>
            <p className="text-sm text-gray-600">رصيد حر 100%</p>
          </button>

          <button
            onClick={() => setSelectedMethod('bnpl')}
            className={`w-full p-4 border-2 rounded-lg text-right ${
              selectedMethod === 'bnpl'
                ? 'border-primary bg-blue-50'
                : 'border-gray-300 hover:border-primary'
            }`}
          >
            <p className="font-semibold">تمويل BNPL (تابي/تمارا)</p>
            <p className="text-sm text-green-600 font-semibold">0% فائدة - تقسيم 70/30</p>
          </button>
        </div>

        {selectedMethod && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">المبلغ (ريال)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="1000"
            />
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            إلغاء
          </button>
          {selectedMethod && (
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              تأكيد
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
