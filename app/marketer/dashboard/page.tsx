'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaPlus, FaBullhorn } from 'react-icons/fa'

export default function MarketerDashboard() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [campaigns, setCampaigns] = useState<any[]>([])

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

    // جلب الحملات
    const campaignsData = localStorage.getItem('marketerCampaigns')
    if (campaignsData) {
      setCampaigns(JSON.parse(campaignsData))
    }
  }, [router])

  const handleNewCampaign = () => {
    router.push('/marketer/new-campaign')
  }

  if (!currentUser) {
    return <div>جاري التحميل...</div>
  }

  // حساب الإحصائيات
  const totalEarnings = campaigns.reduce((sum, c) => sum + (c.earnings || 0), 0)
  const totalClicks = campaigns.reduce((sum, c) => sum + (c.clicks || 0), 0)
  const totalSales = campaigns.reduce((sum, c) => sum + (c.sales || 0), 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">تفصيل - لوحة تحكم المسوّق</h1>
          <button
            onClick={() => {
              localStorage.removeItem('currentUser')
              router.push('/')
            }}
            className="text-gray-600 hover:text-indigo-600"
          >
            تسجيل الخروج
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 mb-2">الأرباح</p>
            <p className="text-3xl font-bold text-green-600">{totalEarnings} TFT</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 mb-2">النقرات</p>
            <p className="text-3xl font-bold text-indigo-600">{totalClicks}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 mb-2">المبيعات</p>
            <p className="text-3xl font-bold text-orange-600">{totalSales}</p>
          </div>
        </div>

        {/* New Campaign Button */}
        <button
          onClick={handleNewCampaign}
          className="w-full bg-orange-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-orange-700 transition mb-8 flex items-center justify-center gap-3"
        >
          <FaPlus />
          إنشاء حملة جديدة
        </button>

        {/* Campaigns List */}
        <div>
          <h2 className="text-2xl font-bold mb-6">حملاتي</h2>
          {campaigns.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <FaBullhorn className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">لا توجد حملات بعد</p>
              <p className="text-gray-500 mt-2">ابدأ بإنشاء حملتك الأولى</p>
            </div>
          ) : (
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{campaign.name}</h3>
                      <p className="text-gray-600 text-sm">{campaign.productUrl}</p>
                    </div>
                    <Link
                      href={`/marketer/campaign/${campaign.id}`}
                      className="text-indigo-600 hover:underline"
                    >
                      عرض التفاصيل
                    </Link>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">النقرات</p>
                      <p className="font-semibold">{campaign.clicks || 0}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">المبيعات</p>
                      <p className="font-semibold">{campaign.sales || 0}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">الأرباح</p>
                      <p className="font-semibold text-green-600">{campaign.earnings || 0} TFT</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
