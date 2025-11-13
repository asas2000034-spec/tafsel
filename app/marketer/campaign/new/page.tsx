'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewCampaignPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    productUrl: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // إنشاء رابط التتبع
    const trackingId = `xyz${Date.now()}`
    const campaign = {
      id: Date.now(),
      name: formData.name,
      productUrl: formData.productUrl,
      trackingLink: `tafseel.com/track/${trackingId}`,
      trackingId,
    }
    
    // حفظ الحملة
    const campaigns = JSON.parse(localStorage.getItem('marketerCampaigns') || '[]')
    campaigns.push(campaign)
    localStorage.setItem('marketerCampaigns', JSON.stringify(campaigns))
    
    // التوجيه إلى صفحة النجاح
    router.push(`/marketer/campaign/${campaign.id}/success`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">إنشاء حملة جديدة</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">اسم الحملة</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="تي شيرت المصمم فلان"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                لصق رابط المنتج من &apos;المول&apos; أو &apos;المزاد&apos;
              </label>
              <input
                type="url"
                value={formData.productUrl}
                onChange={(e) => setFormData({ ...formData, productUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="https://tafseel.com/app/product/1"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                اذهب للمول، انسخ رابط المنتج، والصقه هنا
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
                إنشاء
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
