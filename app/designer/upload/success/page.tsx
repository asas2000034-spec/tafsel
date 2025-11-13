'use client'

import { useRouter } from 'next/navigation'
import { FaStore, FaGavel } from 'react-icons/fa'

export default function UploadSuccessPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold mb-2">رائع! تم توثيق تصميمك.</h1>
          <p className="text-gray-600 mb-6">كيف تريد بيعه؟</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => router.push('/designer/setup/store')}
            className="w-full p-6 border-2 border-primary rounded-lg hover:bg-blue-50 transition text-right"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FaStore className="text-primary" />
                  <span className="font-semibold text-lg">البيع كمنتج ملموس (في المول)</span>
                </div>
                <p className="text-sm text-gray-600">بيع التصميم كمنتج مادي مطبوع</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => router.push('/designer/setup/auction')}
            className="w-full p-6 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition text-right"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FaGavel className="text-gray-600" />
                  <span className="font-semibold text-lg">البيع كأصل رقمي (في المزاد)</span>
                </div>
                <p className="text-sm text-gray-600">بيع التصميم كـ NFT في المزاد</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
