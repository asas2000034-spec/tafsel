'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaShoppingCart, FaGavel, FaWallet, FaClipboardList } from 'react-icons/fa'

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [product, setProduct] = useState<any>(null)

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (user) {
      setCurrentUser(JSON.parse(user))
    } else {
      window.location.href = '/login'
    }

    // جلب بيانات المنتج من localStorage
    const mallProducts = localStorage.getItem('mallProducts')
    if (mallProducts) {
      const parsed = JSON.parse(mallProducts)
      const foundProduct = parsed.find((p: any) => p.id === parseInt(params.id as string))
      if (foundProduct) {
        setProduct({
          id: foundProduct.id,
          name: `${foundProduct.designName} - ${foundProduct.productType === 'tshirt' ? 'تي شيرت' : foundProduct.productType}`,
          price: foundProduct.price,
          description: `تصميم فريد من ${foundProduct.designName}`,
        })
        return
      }
    }
    
    // منتجات افتراضية
    const products: any = {
      '1': { id: 1, name: 'تي شيرت بريميوم - تصميم X', price: 200, description: 'تي شيرت عالي الجودة بتصميم فريد' },
      '2': { id: 2, name: 'تي شيرت كلاسيك - تصميم Y', price: 150, description: 'تي شيرت كلاسيكي بتصميم أنيق' },
      '3': { id: 3, name: 'تي شيرت رياضي - تصميم Z', price: 180, description: 'تي شيرت رياضي مريح' },
    }
    setProduct(products[params.id as string] || products['1'])
  }, [params])

  const handleBuy = () => {
    router.push(`/app/checkout/${product.id}`)
  }

  if (!currentUser || !product) {
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
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="h-96 bg-gradient-to-br from-indigo-200 to-purple-200"></div>
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <div className="flex items-center justify-between mb-6">
              <span className="text-3xl font-bold text-indigo-600">{product.price} TFT</span>
            </div>
            <button
              onClick={handleBuy}
              className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition"
            >
              اشتر الآن
            </button>
          </div>
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
