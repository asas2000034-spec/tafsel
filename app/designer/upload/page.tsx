'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function UploadDesignPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    file: null as File | null,
  })
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (user) {
      const userData = JSON.parse(user)
      if (userData.role !== 'designer') {
        router.push('/')
        return
      }
      setCurrentUser(userData)
    } else {
      router.push('/login')
      return
    }
  }, [router])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.file || !formData.name) {
      alert('يرجى ملء جميع الحقول')
      return
    }

    setUploading(true)

    // محاكاة عملية Mint NFT
    setTimeout(() => {
      const newDesign = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        nftMinted: true,
        nftHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        date: new Date().toISOString(),
      }

      // حفظ التصميم
      const designs = JSON.parse(localStorage.getItem('designerDesigns') || '[]')
      designs.push(newDesign)
      localStorage.setItem('designerDesigns', JSON.stringify(designs))

      // حفظ حالة الاختيار المزدوج
      localStorage.setItem('lastMintedDesign', JSON.stringify(newDesign))

      setUploading(false)
      router.push('/designer/dual-choice')
    }, 2000)
  }

  if (!currentUser) {
    return <div>جاري التحميل...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-indigo-600">رفع تصميم جديد</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">رفع ملف التصميم</label>
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
                className="cursor-pointer flex flex-col items-center"
              >
                <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-gray-600">اضغط لرفع الملف</span>
                {formData.file && (
                  <span className="text-sm text-indigo-600 mt-2">{formData.file.name}</span>
                )}
              </label>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">اسم التصميم</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="مثال: تصميم تي شيرت فريد"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">الوصف</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              rows={4}
              placeholder="وصف التصميم..."
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              ℹ️ سيتم توثيق تصميمك كـ NFT على Polygon لحفظ حقوقك.
            </p>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
          >
            {uploading ? 'جاري التوثيق...' : 'توثيق وحفظ الحقوق'}
          </button>
        </form>
      </main>
    </div>
  )
}
