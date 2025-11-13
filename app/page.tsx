'use client'

import Link from 'next/link'
import { FaShoppingCart, FaPalette, FaIndustry, FaBullhorn } from 'react-icons/fa'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">تفصيل</div>
          <div className="flex gap-4">
            <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-primary">
              تسجيل الدخول
            </Link>
            <Link href="/register" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
              إنشاء حساب
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          مرحباً بك في تفصيل
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          منصة متكاملة تجمع بين التسوق والإبداع والاستثمار
        </p>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaShoppingCart className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">المول</h3>
            <p className="text-gray-600">تسوق منتجات متميزة</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaPalette className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">NFT</h3>
            <p className="text-gray-600">توثيق وحماية إبداعاتك</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl text-primary mx-auto mb-4 font-bold">💰</div>
            <h3 className="text-lg font-semibold mb-2">كاش</h3>
            <p className="text-gray-600">تمويل ذكي بدون فوائد</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaBullhorn className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">ماركتنج</h3>
            <p className="text-gray-600">كسب عمولات من التسويق</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center">
          <Link 
            href="/register" 
            className="px-8 py-4 bg-primary text-white rounded-lg text-lg font-semibold hover:bg-primary-dark transition"
          >
            إنشاء حساب
          </Link>
          <Link 
            href="/login" 
            className="px-8 py-4 bg-white text-primary border-2 border-primary rounded-lg text-lg font-semibold hover:bg-gray-50 transition"
          >
            تسجيل الدخول
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">منتجات مميزة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">تي شيرت بريميوم {i}</h3>
                <p className="text-gold font-bold">200 TFT</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Auctions */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">مزادات حية</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">NFT #{i}</h3>
                <p className="text-gold font-bold">السعر الحالي: 500 TFT</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 تفصيل. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  )
}
