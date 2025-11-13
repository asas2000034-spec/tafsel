'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // في التطبيق الحقيقي، سيتم التحقق من الخادم
    const stored = localStorage.getItem('userData')
    if (stored) {
      const userData = JSON.parse(stored)
      if (userData.email === formData.email && userData.password === formData.password) {
        localStorage.setItem('currentUser', JSON.stringify(userData))
        
        // التوجيه حسب الدور
        if (userData.role) {
          switch (userData.role) {
            case 'customer':
              router.push('/app/mall')
              break
            case 'designer':
              router.push('/designer/dashboard')
              break
            case 'factory':
              router.push('/factory/dashboard')
              break
            case 'marketer':
              router.push('/marketer/dashboard')
              break
            default:
              router.push('/role-selection')
          }
        } else {
          router.push('/role-selection')
        }
      } else {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة')
      }
    } else {
      setError('لا يوجد حساب بهذا البريد الإلكتروني')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">تسجيل الدخول</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">كلمة المرور</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            تسجيل الدخول
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          ليس لديك حساب؟{' '}
          <Link href="/register" className="text-indigo-600 hover:underline">
            إنشاء حساب جديد
          </Link>
        </p>
      </div>
    </div>
  )
}
