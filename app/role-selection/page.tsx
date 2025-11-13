'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { FaShoppingCart, FaPalette, FaIndustry, FaBullhorn } from 'react-icons/fa'

export default function RoleSelectionPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    // جلب بيانات المستخدم من localStorage
    const stored = localStorage.getItem('userData')
    if (stored) {
      setUserData(JSON.parse(stored))
    } else {
      // إذا لم تكن هناك بيانات، التوجيه للتسجيل
      router.push('/register')
    }
  }, [router])

  const handleRoleSelection = (role: string) => {
    if (!userData) return

    // تحديث بيانات المستخدم بالدور المختار
    const updatedUserData = { ...userData, role }
    localStorage.setItem('userData', JSON.stringify(updatedUserData))
    localStorage.setItem('currentUser', JSON.stringify(updatedUserData))

    // التوجيه حسب الدور
    switch (role) {
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
        router.push('/')
    }
  }

  const roles = [
    {
      id: 'customer',
      title: 'أنا عميل / مشتري',
      description: 'جئت للتسوق والاستثمار',
      icon: FaShoppingCart,
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      id: 'designer',
      title: 'أنا مصمم / مبدع',
      description: 'جئت لبيع إبداعاتي',
      icon: FaPalette,
      color: 'bg-purple-500 hover:bg-purple-600',
    },
    {
      id: 'factory',
      title: 'أنا مصنع / مزود خدمة',
      description: 'جئت لتقديم خدمات الإنتاج',
      icon: FaIndustry,
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      id: 'marketer',
      title: 'أنا مسوّق / وكالة',
      description: 'جئت للترويج وكسب العمولات',
      icon: FaBullhorn,
      color: 'bg-orange-500 hover:bg-orange-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-4 text-indigo-600">
          أهلاً بك في تفصيل!
        </h1>
        <p className="text-xl text-center mb-8 text-gray-600">
          اختر دورك الأساسي:
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {roles.map((role) => {
            const Icon = role.icon
            return (
              <button
                key={role.id}
                onClick={() => handleRoleSelection(role.id)}
                className={`${role.color} text-white p-6 rounded-xl shadow-lg transition transform hover:scale-105 flex flex-col items-center space-y-4`}
              >
                <Icon className="text-5xl" />
                <h2 className="text-2xl font-semibold">{role.title}</h2>
                <p className="text-lg opacity-90">{role.description}</p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
