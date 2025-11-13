'use client'

import { useRouter } from 'next/navigation'
import { FaUpload, FaPalette } from 'react-icons/fa'

export default function DesignerDashboard() {
  const router = useRouter()

  const designs = [
    { id: 1, name: 'تصميم تي شيرت 1', status: 'منشور', sales: 5 },
    { id: 2, name: 'تصميم تي شيرت 2', status: 'مسودة', sales: 0 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم المصمم</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* الإحصائيات */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600 mb-1">الأرباح</p>
            <p className="text-2xl font-bold text-gold">1,250 TFT</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600 mb-1">المبيعات</p>
            <p className="text-2xl font-bold text-primary">5</p>
          </div>
        </div>

        {/* زر رفع تصميم جديد */}
        <button
          onClick={() => router.push('/designer/upload')}
          className="w-full bg-primary text-white py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition mb-6 flex items-center justify-center gap-2"
        >
          <FaUpload />
          + رفع تصميم جديد (Auto-Mint NFT)
        </button>

        {/* قائمة التصاميم */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-4">تصاميمي</h2>
          <div className="space-y-3">
            {designs.map((design) => (
              <div key={design.id} className="border-b pb-3 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{design.name}</h3>
                    <p className="text-sm text-gray-600">المبيعات: {design.sales}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    design.status === 'منشور' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {design.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
