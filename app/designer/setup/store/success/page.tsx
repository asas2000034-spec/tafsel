'use client'

import { useRouter } from 'next/navigation'

export default function StoreSuccessPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold mb-2">تهانينا!</h1>
        <p className="text-gray-600 mb-6">تصميمك معروض الآن للبيع كمنتج في المول.</p>
        <button
          onClick={() => router.push('/designer/dashboard')}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark"
        >
          العودة للوحة التحكم
        </button>
      </div>
    </div>
  )
}
