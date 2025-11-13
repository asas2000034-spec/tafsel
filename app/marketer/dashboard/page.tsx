'use client'

import { useRouter } from 'next/navigation'
import { FaPlus, FaLink } from 'react-icons/fa'

export default function MarketerDashboard() {
  const router = useRouter()

  const campaigns = [
    { id: 1, name: 'تي شيرت المصمم فلان', clicks: 150, sales: 5, earnings: 75 },
    { id: 2, name: 'حملة صيفية', clicks: 200, sales: 8, earnings: 120 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم المسوّق</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* الإحصائيات */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600 mb-1">الأرباح</p>
            <p className="text-2xl font-bold text-gold">195 TFT</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600 mb-1">النقرات</p>
            <p className="text-2xl font-bold text-primary">350</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600 mb-1">المبيعات</p>
            <p className="text-2xl font-bold text-green-600">13</p>
          </div>
        </div>

        {/* زر إنشاء حملة جديدة */}
        <button
          onClick={() => router.push('/marketer/campaign/new')}
          className="w-full bg-primary text-white py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition mb-6 flex items-center justify-center gap-2"
        >
          <FaPlus />
          + إنشاء حملة جديدة
        </button>

        {/* قائمة الحملات */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-4">حملاتي</h2>
          <div className="space-y-3">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="border-b pb-3 last:border-b-0">
                <h3 className="font-semibold mb-2">{campaign.name}</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">النقرات</p>
                    <p className="font-semibold">{campaign.clicks}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">المبيعات</p>
                    <p className="font-semibold">{campaign.sales}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">الأرباح</p>
                    <p className="font-semibold text-gold">{campaign.earnings} TFT</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
