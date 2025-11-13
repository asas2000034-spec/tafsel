'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { FaCopy, FaDownload } from 'react-icons/fa'

export default function CampaignSuccessPage() {
  const params = useParams()
  const [campaign, setCampaign] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const campaigns = JSON.parse(localStorage.getItem('marketerCampaigns') || '[]')
    const foundCampaign = campaigns.find((c: any) => c.id.toString() === params.id)
    if (foundCampaign) {
      setCampaign(foundCampaign)
    }
  }, [params.id])

  const handleCopy = () => {
    if (campaign) {
      navigator.clipboard.writeText(`https://${campaign.trackingLink}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>جارٍ التحميل...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">تم إنشاء حملتك بنجاح!</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2">{campaign.name}</h2>
          </div>

          {/* رابط التتبع */}
          <div>
            <label className="block text-sm font-medium mb-2">رابط التتبع (Tracking Link)</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={`https://${campaign.trackingLink}`}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center gap-2"
              >
                <FaCopy />
                {copied ? 'تم النسخ!' : 'نسخ'}
              </button>
            </div>
          </div>

          {/* QR Code */}
          <div>
            <label className="block text-sm font-medium mb-2">QR Code</label>
            <div className="bg-gray-100 rounded-lg p-8 flex flex-col items-center">
              <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center mb-4">
                <span className="text-gray-400">QR Code</span>
              </div>
              <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center gap-2">
                <FaDownload />
                تحميل
              </button>
            </div>
          </div>

          {/* معلومات إضافية */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              💡 استخدم هذا الرابط في منشوراتك وستحصل على عمولة عند كل عملية شراء!
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
