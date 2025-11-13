'use client'

import Link from 'next/link'
import { FaShoppingCart, FaPalette, FaIndustry, FaBullhorn, FaGavel } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600">تفصيل</div>
          <div className="flex gap-4">
            <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-indigo-600">
              تسجيل الدخول
            </Link>
            <Link href="/register" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              إنشاء حساب
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            مرحباً بك في <span className="text-indigo-600">تفصيل</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            منصة متكاملة للتسوق والتصميم والمزادات
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <FaShoppingCart className="text-4xl text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">المول</h3>
            <p className="text-gray-600">تسوق منتجات مخصصة بتصاميم فريدة</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <FaPalette className="text-4xl text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">NFT</h3>
            <p className="text-gray-600">توثيق التصاميم كأصول رقمية</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <FaGavel className="text-4xl text-yellow-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">المزادات</h3>
            <p className="text-gray-600">مزادات حية على التصاميم الفريدة</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <FaBullhorn className="text-4xl text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">التسويق</h3>
            <p className="text-gray-600">كسب عمولات من الترويج</p>
          </div>
        </div>

        {/* Featured Products */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">منتجات مميزة</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-indigo-200 to-purple-200"></div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">تي شيرت مخصص {item}</h3>
                  <p className="text-indigo-600 font-bold">200 TFT</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Auctions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">مزادات حية</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">تصميم فريد #{item}</h3>
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">مباشر</span>
                </div>
                <p className="text-gray-600 mb-4">السعر الحالي: 500 TFT</p>
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
                  المزايدة الآن
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="text-center">
          <Link href="/register" className="inline-block px-8 py-4 bg-indigo-600 text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 mr-4">
            إنشاء حساب
          </Link>
          <Link href="/login" className="inline-block px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg text-lg font-semibold hover:bg-indigo-50">
            تسجيل الدخول
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 تفصيل. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  )
}
