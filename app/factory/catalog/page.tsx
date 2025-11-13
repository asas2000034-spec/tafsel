'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaPlus, FaBox } from 'react-icons/fa'

export default function CatalogPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (user) {
      const userData = JSON.parse(user)
      if (userData.role !== 'factory') {
        router.push('/')
        return
      }
      setCurrentUser(userData)
    } else {
      router.push('/login')
      return
    }

    // جلب المنتجات
    const productsData = localStorage.getItem('factoryCatalog')
    if (productsData) {
      setProducts(JSON.parse(productsData))
    }
  }, [router])

  if (!currentUser) {
    return <div>جاري التحميل...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">إدارة الكتالوج</h1>
          <Link
            href="/factory/add-product"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <FaPlus />
            إضافة منتج خام جديد
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {products.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <FaBox className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-4">لا توجد منتجات في الكتالوج</p>
            <Link
              href="/factory/add-product"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              إضافة منتج خام جديد
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">التكلفة:</span>
                  <span className="text-2xl font-bold text-green-600">{product.cost} TFT</span>
                </div>
                {product.colors && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">الألوان المتاحة:</p>
                    <div className="flex gap-2">
                      {product.colors.split(',').map((color: string, idx: number) => (
                        <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {color.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
