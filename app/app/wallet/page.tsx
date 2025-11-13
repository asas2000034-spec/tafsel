'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaShoppingCart, FaGavel, FaWallet, FaClipboardList, FaLock, FaUnlock } from 'react-icons/fa'

export default function WalletPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [wallet, setWallet] = useState({
    total: 0,
    free: 0,
    locked: 0,
  })
  const [showTopUp, setShowTopUp] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (user) {
      setCurrentUser(JSON.parse(user))
    } else {
      window.location.href = '/login'
    }

    // جلب بيانات المحفظة
    const walletData = localStorage.getItem('wallet')
    if (walletData) {
      setWallet(JSON.parse(walletData))
    }
  }, [])

  const handleTopUp = () => {
    setShowTopUp(true)
  }

  if (!currentUser) {
    return <div>جاري التحميل...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-indigo-600">تفصيل</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">تفصيل كاش</h2>
        
        {/* Wallet Cards */}
        <div className="space-y-4 mb-8">
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-lg mb-2">إجمالي الرصيد</p>
            <p className="text-4xl font-bold">{wallet.total} TFT</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FaUnlock className="text-green-500 text-xl" />
                <div>
                  <p className="text-gray-600">الرصيد الحر</p>
                  <p className="text-2xl font-bold text-green-600">{wallet.free} TFT</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FaLock className="text-orange-500 text-xl" />
                <div>
                  <p className="text-gray-600">الرصيد المقفل</p>
                  <p className="text-2xl font-bold text-orange-600">{wallet.locked} TFT</p>
                  <p className="text-sm text-gray-500 mt-1">للاستخدام داخل المنصة فقط</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Up Button */}
        <button
          onClick={handleTopUp}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition mb-8"
        >
          + شحن المحفظة (Top Up)
        </button>

        {/* Top Up Modal */}
        {showTopUp && (
          <TopUpModal
            onClose={() => setShowTopUp(false)}
            onSuccess={(newWallet) => {
              setWallet(newWallet)
              localStorage.setItem('wallet', JSON.stringify(newWallet))
              setShowTopUp(false)
            }}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-around items-center py-3">
            <Link href="/app/mall" className="flex flex-col items-center text-gray-600 hover:text-indigo-600">
              <FaShoppingCart className="text-xl mb-1" />
              <span className="text-xs">المول</span>
            </Link>
            <Link href="/app/auction" className="flex flex-col items-center text-gray-600 hover:text-indigo-600">
              <FaGavel className="text-xl mb-1" />
              <span className="text-xs">المزاد</span>
            </Link>
            <Link href="/app/wallet" className="flex flex-col items-center text-indigo-600">
              <FaWallet className="text-xl mb-1" />
              <span className="text-xs">المحفظة</span>
            </Link>
            <Link href="/app/orders" className="flex flex-col items-center text-gray-600 hover:text-indigo-600">
              <FaClipboardList className="text-xl mb-1" />
              <span className="text-xs">طلباتي</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

function TopUpModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: (wallet: any) => void }) {
  const [selectedOption, setSelectedOption] = useState<'normal' | 'bnpl' | null>(null)
  const [amount, setAmount] = useState('')

  const handleSubmit = () => {
    if (!selectedOption || !amount) return

    const amountNum = parseFloat(amount)
    if (isNaN(amountNum) || amountNum <= 0) return

    if (selectedOption === 'bnpl') {
      // نظام BNPL: 70% حر، 30% مقفل
      const free = amountNum * 0.7
      const locked = amountNum * 0.3
      onSuccess({
        total: amountNum,
        free: free,
        locked: locked,
      })
    } else {
      // شحن عادي: 100% حر
      onSuccess({
        total: amountNum,
        free: amountNum,
        locked: 0,
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">خيارات الشحن</h2>

        <div className="space-y-4 mb-6">
          <button
            onClick={() => setSelectedOption('normal')}
            className={`w-full p-4 rounded-lg border-2 text-right ${
              selectedOption === 'normal'
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-300 hover:border-indigo-300'
            }`}
          >
            <div className="font-semibold mb-1">شحن عادي (Mada / Apple Pay)</div>
            <div className="text-sm text-gray-600">رصيد حر 100%</div>
          </button>

          <button
            onClick={() => setSelectedOption('bnpl')}
            className={`w-full p-4 rounded-lg border-2 text-right ${
              selectedOption === 'bnpl'
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-300 hover:border-indigo-300'
            }`}
          >
            <div className="font-semibold mb-1">تمويل BNPL (تابي/تمارا)</div>
            <div className="text-sm text-green-600 font-semibold">0% فائدة - تقسيم 70/30</div>
          </button>
        </div>

        {selectedOption && (
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">المبلغ (ريال)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
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
          <button
            onClick={handleSubmit}
            disabled={!selectedOption || !amount}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            تأكيد
          </button>
        </div>
      </div>
    </div>
  )
}
