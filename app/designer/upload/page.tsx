'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function UploadDesignPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    file: null as File | null,
  })
  const [uploaded, setUploaded] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // محاكاة رفع الملف وتوثيقه كـ NFT
    setUploaded(true)
    setTimeout(() => {
      router.push('/designer/upload/success')
    }, 1500)
  }

  if (uploaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-xl">جاري توثيق التصميم...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">رفع تصميم جديد</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* رفع الملف */}
            <div>
              <label className="block text-sm font-medium mb-2">رفع ملف التصميم</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  required
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-primary hover:underline"
                >
                  اضغط لاختيار الملف
                </label>
                {formData.file && (
                  <p className="mt-2 text-sm text-gray-600">{formData.file.name}</p>
                )}
              </div>
            </div>

            {/* اسم التصميم */}
            <div>
              <label className="block text-sm font-medium mb-2">اسم التصميم</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="مثال: تي شيرت صيفي 2024"
                required
              />
            </div>

            {/* الوصف */}
            <div>
              <label className="block text-sm font-medium mb-2">الوصف</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows={4}
                placeholder="وصف التصميم..."
              />
            </div>

            {/* ملاحظة التوثيق */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                📝 سيتم توثيق تصميمك كـ NFT على Polygon لحفظ حقوقك.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition"
            >
              توثيق وحفظ الحقوق
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
