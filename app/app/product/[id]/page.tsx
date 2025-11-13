'use client'

import { useParams, useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import BottomNav from '@/components/BottomNav'

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { wallet } = useStore()

  const product = {
    id: params.id,
    name: 'تي شيرت بريميوم',
    price: 200,
    description: 'تي شيرت عالي الجودة من القطن 100%',
  }

  const handleBuy = () => {
    router.push(`/app/checkout/${product.id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">تفاصيل المنتج</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-64 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">صورة المنتج</span>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-3xl font-bold text-gold mb-6">{product.price} TFT</p>
            <button
              onClick={handleBuy}
              className="w-full bg-primary text-white py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition"
            >
              اشتر الآن
            </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
