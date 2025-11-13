'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddProductPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    colors: '',
    sizes: '',
    baseCost: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // حفظ المنتج في الكتالوج
    const catalog = JSON.parse(localStorage.getItem('factoryCatalog') || '[]')
    catalog.push({
      id: Date.now(),
      ...formData,
      baseCost: parseFloat(formData.baseCost),
    })
    localStorage.setItem('factoryCatalog', JSON.stringify(catalog))
    
    router.push('/factory/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">إضافة منتج خام جديد</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">اسم المنتج</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="تي شيرت بريميوم"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">الوصف</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows={3}
                placeholder="وصف المنتج..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">الألوان المتاحة</label>
              <input
                type="text"
                value={formData.colors}
                onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="أبيض، أسود، أزرق"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">المقاسات</label>
              <input
                type="text"
                value={formData.sizes}
                onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="S، M، L، XL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                التكلفة الأساسية (بالـ TFT)
              </label>
              <input
                type="number"
                value={formData.baseCost}
                onChange={(e) => setFormData({ ...formData, baseCost: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="50"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                هذه التكلفة ستظهر للمصممين عند اختيار منتجك
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
              >
                حفظ
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
