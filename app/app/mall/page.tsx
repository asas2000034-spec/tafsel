'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaShoppingCart, FaGavel, FaWallet, FaClipboardList } from 'react-icons/fa'

export default function MallPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('mall')
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (user) {
      setCurrentUser(JSON.parse(user))
    } else {
      window.location.href = '/login'
    }

    // جلب المنتجات من المول (التي أنشأها المصممون)
    const mallProducts = localStorage.getItem('mallProducts')
    if (mallProducts) {
      const parsed = JSON.parse(mallProducts)
      // تحويل البيانات لتنسيق مناسب
      setProducts(parsed.map((p: any) => ({
        id: p.id,
        name: `${p.designName} - ${p.productType === 'tshirt' ? 'تي شيرت' : p.productType}`,
        price: p.price,
        designId: p.designId,
      })))
    } else {
      // منتجات افتراضية للعرض
      setProducts([
        { id: 1, name: 'تي شيرت بريميوم - تصميم X', price: 200 },
        { id: 2, name: 'تي شيرت كلاسيك - تصميم Y', price: 150 },
        { id: 3, name: 'تي شيرت رياضي - تصميم Z', price: 180 },
      ])
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
        <h2 className="text-3xl font-bold mb-8">المول</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/app/product/${product.id}`}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer">
                <div className="h-48 bg-gradient-to-br from-indigo-200 to-purple-200"></div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-indigo-600 font-bold text-xl">{product.price} TFT</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-around items-center py-3">
            <Link href="/app/mall" className="flex flex-col items-center text-indigo-600">
              <FaShoppingCart className="text-xl mb-1" />
              <span className="text-xs">المول</span>
            </Link>
            <Link href="/app/auction" className="flex flex-col items-center text-gray-600 hover:text-indigo-600">
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
