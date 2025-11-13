'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaPlus, FaPalette } from 'react-icons/fa'

export default function DesignerDashboard() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [designs, setDesigns] = useState<any[]>([])

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

    // جلب التصاميم
    const designsData = localStorage.getItem('designerDesigns')
    if (designsData) {
      setDesigns(JSON.parse(designsData))
    }
  }, [router])

  const handleNewDesign = () => {
    router.push('/designer/upload')
  }

  if (!currentUser) {
    return <div>جاري التحميل...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">تفصيل - لوحة تحكم المصمم</h1>
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
            <p className="text-3xl font-bold text-green-600">0 TFT</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 mb-2">المبيعات</p>
            <p className="text-3xl font-bold text-indigo-600">0</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 mb-2">التصاميم</p>
            <p className="text-3xl font-bold text-purple-600">{designs.length}</p>
          </div>
        </div>

        {/* New Design Button */}
        <button
          onClick={handleNewDesign}
          className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-purple-700 transition mb-8 flex items-center justify-center gap-3"
        >
          <FaPlus />
          رفع تصميم جديد (Auto-Mint NFT)
        </button>

        {/* Designs List */}
        <div>
          <h2 className="text-2xl font-bold mb-6">تصاميمي</h2>
          {designs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <FaPalette className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">لا توجد تصاميم بعد</p>
              <p className="text-gray-500 mt-2">ابدأ برفع تصميمك الأول</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {designs.map((design) => (
                <div key={design.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-purple-200 to-pink-200"></div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{design.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{design.description}</p>
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs">
                      NFT موثق
                    </span>
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
