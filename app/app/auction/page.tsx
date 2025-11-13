'use client'

import BottomNav from '@/components/BottomNav'

export default function AuctionPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">المزاد</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <p className="text-center text-gray-600">قريباً: المزادات الحية</p>
      </main>

      <BottomNav />
    </div>
  )
}
