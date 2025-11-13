'use client'

import { useRouter } from 'next/navigation'
import { FaShoppingCart, FaPalette, FaIndustry, FaBullhorn } from 'react-icons/fa'

export default function RoleSelectionPage() {
  const router = useRouter()

  const handleRoleSelection = (role: string) => {
    // حفظ الدور في localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    localStorage.setItem('user', JSON.stringify({ ...user, role }))

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
        break
    }
  }

  const roles = [
    {
      id: 'customer',
      title: 'أنا عميل / مشتري',
      description: 'جئت للتسوق والاستثمار',
      icon: FaShoppingCart,
      color: 'bg-blue-500',
    },
    {
      id: 'designer',
      title: 'أنا مصمم / مبدع',
      description: 'جئت لبيع إبداعاتي',
      icon: FaPalette,
      color: 'bg-purple-500',
    },
    {
      id: 'factory',
      title: 'أنا مصنع / مزود خدمة',
      description: 'جئت لتقديم خدمات الإنتاج',
      icon: FaIndustry,
      color: 'bg-green-500',
    },
    {
      id: 'marketer',
      title: 'أنا مسوّق / وكالة',
      description: 'جئت للترويج وكسب العمولات',
      icon: FaBullhorn,
      color: 'bg-orange-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
          أهلاً بك في تفصيل!
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          اختر دورك الأساسي:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => {
            const Icon = role.icon
            return (
              <button
                key={role.id}
                onClick={() => handleRoleSelection(role.id)}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all transform hover:scale-105 text-right"
              >
                <div className={`${role.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto`}>
                  <Icon className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-gray-900">{role.title}</h2>
                <p className="text-gray-600">{role.description}</p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
