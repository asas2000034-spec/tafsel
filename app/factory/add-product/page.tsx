'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AddProductPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    colors: '',
    sizes: '',
    cost: '',
  })

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
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.cost) {
      alert('يرجى ملء جميع الحقول المطلوبة')
      return
    }

    const newProduct = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      colors: formData.colors,
      sizes: formData.sizes,
      cost: parseFloat(formData.cost),
      date: new Date().toISOString(),
    }

    // حفظ المنتج
    const products = JSON.parse(localStorage.getItem('factoryCatalog') || '[]')
    products.push(newProduct)
    localStorage.setItem('factoryCatalog', JSON.stringify(products))

    alert('تم إضافة المنتج بنجاح!')
    router.push('/factory/catalog')
  }

  if (!currentUser) {
    return <div>جاري التحميل...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-indigo-600">إضافة منتج خام جديد</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">اسم المنتج</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="مثال: تي شيرت بريميوم"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">الوصف</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              rows={4}
              placeholder="وصف المنتج..."
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">الألوان المتاحة</label>
            <input
              type="text"
              value={formData.colors}
              onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="مثال: أسود، أبيض، رمادي"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">المقاسات</label>
            <input
              type="text"
              value={formData.sizes}
              onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="مثال: S، M، L، XL"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">التكلفة الأساسية (بالـ TFT)</label>
            <input
              type="number"
              required
              step="0.01"
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="50"
            />
            <p className="text-sm text-gray-500 mt-1">
              هذه التكلفة هي التي سيراها المصممون عند اختيار منتجك
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            حفظ
          </button>
        </form>
      </main>
    </div>
  )
}
