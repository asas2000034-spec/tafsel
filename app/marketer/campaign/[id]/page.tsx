'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { FaCopy, FaDownload, FaQrcode } from 'react-icons/fa'

export default function CampaignPage() {
  const params = useParams()
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [campaign, setCampaign] = useState<any>(null)
  const [copied, setCopied] = useState(false)

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

    // جلب بيانات الحملة
    const campaigns = JSON.parse(localStorage.getItem('marketerCampaigns') || '[]')
    const foundCampaign = campaigns.find((c: any) => c.id === params.id)
    if (foundCampaign) {
      setCampaign(foundCampaign)
    } else {
      router.push('/marketer/dashboard')
    }
  }, [params, router])

  const handleCopy = () => {
    if (campaign) {
      navigator.clipboard.writeText(campaign.trackingLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!currentUser || !campaign) {
    return <div>جاري التحميل...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-indigo-600">حملة: {campaign.name}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center space-y-6">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold">تم إنشاء حملتك بنجاح!</h2>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div>
              <label className="block text-gray-600 mb-2 text-right">رابط التتبع (Tracking Link)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={campaign.trackingLink}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
                <button
                  onClick={handleCopy}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                >
                  <FaCopy />
                  {copied ? 'تم النسخ!' : 'نسخ'}
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <label className="block text-gray-600 mb-4">QR Code</label>
              <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg">
                  <FaQrcode className="text-6xl text-gray-400" />
                </div>
              </div>
              <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 mx-auto">
                <FaDownload />
                تحميل QR Code
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <button
              onClick={() => router.push('/marketer/dashboard')}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              العودة للوحة التحكم
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
