'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaStore, FaGavel } from 'react-icons/fa'

export default function DualChoicePage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [design, setDesign] = useState<any>(null)

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

    const lastDesign = localStorage.getItem('lastMintedDesign')
    if (lastDesign) {
      setDesign(JSON.parse(lastDesign))
    } else {
      router.push('/designer/dashboard')
    }
  }, [router])

  const handleStoreMode = () => {
    if (design) {
      localStorage.setItem('selectedDesignForStore', JSON.stringify(design))
      router.push('/designer/store-setup')
    }
  }

  const handleAuctionMode = () => {
    // في المستقبل: توجيه لصفحة إعداد المزاد
    alert('ميزة المزاد قريباً...')
  }

  if (!currentUser || !design) {
    return <div>جاري التحميل...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">رائع! تم توثيق تصميمك.</h1>
          <p className="text-xl text-gray-600">كيف تريد بيعه؟</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={handleStoreMode}
            className="bg-indigo-600 text-white p-8 rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:scale-105 flex flex-col items-center space-y-4"
          >
            <FaStore className="text-5xl" />
            <h2 className="text-2xl font-semibold">البيع كمنتج ملموس</h2>
            <p className="text-lg opacity-90">(في المول)</p>
          </button>

          <button
            onClick={handleAuctionMode}
            className="bg-purple-600 text-white p-8 rounded-xl shadow-lg hover:bg-purple-700 transition transform hover:scale-105 flex flex-col items-center space-y-4"
          >
            <FaGavel className="text-5xl" />
            <h2 className="text-2xl font-semibold">البيع كأصل رقمي</h2>
            <p className="text-lg opacity-90">(في المزاد)</p>
          </button>
        </div>
      </div>
    </div>
  )
}
