'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useStore } from '@/lib/store'
import BottomNav from '@/components/BottomNav'

export default function MallPage() {
  const { setUser } = useStore()

  useEffect(() => {
    // تحميل بيانات المستخدم من localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [setUser])

  const products = [
    { id: 1, name: 'تي شيرت بريميوم', price: 200, image: '/placeholder-tshirt.jpg' },
    { id: 2, name: 'تي شيرت كلاسيك', price: 150, image: '/placeholder-tshirt.jpg' },
    { id: 3, name: 'تي شيرت رياضي', price: 180, image: '/placeholder-tshirt.jpg' },
    { id: 4, name: 'تي شيرت فاخر', price: 250, image: '/placeholder-tshirt.jpg' },
    { id: 5, name: 'تي شيرت بسيط', price: 120, image: '/placeholder-tshirt.jpg' },
    { id: 6, name: 'تي شيرت متميز', price: 220, image: '/placeholder-tshirt.jpg' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">المول</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/app/product/${product.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">صورة المنتج</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gold font-bold text-xl">{product.price} TFT</p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
