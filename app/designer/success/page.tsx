'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaCheckCircle } from 'react-icons/fa'

export default function SuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // تنظيف البيانات المؤقتة
    localStorage.removeItem('lastMintedDesign')
    localStorage.removeItem('selectedDesignForStore')
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md text-center">
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheckCircle className="text-5xl text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-4">تهانينا!</h1>
        <p className="text-xl text-gray-600 mb-8">
          تصميمك معروض الآن للبيع كمنتج في المول.
        </p>
        <button
          onClick={() => router.push('/designer/dashboard')}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          العودة للوحة التحكم
        </button>
      </div>
    </div>
  )
}
