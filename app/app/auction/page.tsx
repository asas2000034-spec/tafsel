'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaShoppingCart, FaGavel, FaWallet, FaClipboardList } from 'react-icons/fa'

export default function AuctionPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (user) {
      setCurrentUser(JSON.parse(user))
    } else {
      window.location.href = '/login'
    }
  }, [])

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
        <h2 className="text-3xl font-bold mb-8">المزادات</h2>
        
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <p className="text-gray-600 text-lg">المزادات قريباً...</p>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-around items-center py-3">
            <Link href="/app/mall" className="flex flex-col items-center text-gray-600 hover:text-indigo-600">
              <FaShoppingCart className="text-xl mb-1" />
              <span className="text-xs">المول</span>
            </Link>
            <Link href="/app/auction" className="flex flex-col items-center text-indigo-600">
              <FaGavel className="text-xl mb-1" />
              <span className="text-xs">المزاد</span>
            </Link>
            <Link href="/app/wallet" className="flex flex-col items-center text-gray-600 hover:text-indigo-600">
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
