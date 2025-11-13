'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NewCampaignPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    productUrl: '',
  })

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (user) {
      const userData = JSON.parse(user)
      if (userData.role !== 'marketer') {
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
    if (!formData.name || !formData.productUrl) {
      alert('يرجى ملء جميع الحقول')
      return
    }

    const campaignId = `xyz${Math.random().toString(36).substr(2, 9)}`
    const newCampaign = {
      id: campaignId,
      name: formData.name,
      productUrl: formData.productUrl,
      trackingLink: `tafseel.com/track/${campaignId}`,
      clicks: 0,
      sales: 0,
      earnings: 0,
      date: new Date().toISOString(),
    }

    // حفظ الحملة
    const campaigns = JSON.parse(localStorage.getItem('marketerCampaigns') || '[]')
    campaigns.push(newCampaign)
    localStorage.setItem('marketerCampaigns', JSON.stringify(campaigns))

    router.push(`/marketer/campaign/${campaignId}`)
  }

  if (!currentUser) {
    return <div>جاري التحميل...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-indigo-600">إنشاء حملة جديدة</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">اسم الحملة</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="مثال: تي شيرت المصمم فلان"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">لصق رابط المنتج من 'المول' أو 'المزاد'</label>
            <input
              type="url"
              required
              value={formData.productUrl}
              onChange={(e) => setFormData({ ...formData, productUrl: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="https://tafseel.com/app/product/1"
            />
            <p className="text-sm text-gray-500 mt-2">
              اذهب للمول، انسخ رابط المنتج الذي تريد الترويج له، والصقه هنا
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
          >
            إنشاء
          </button>
        </form>
      </main>
    </div>
  )
}
