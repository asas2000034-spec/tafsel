'use client';

import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import { ShoppingCart, Palette, Factory, Megaphone } from 'lucide-react';
import { UserRole } from '@/types';

export default function SelectRolePage() {
  const { selectRole } = useApp();
  const router = useRouter();

  const handleRoleSelect = async (role: UserRole) => {
    try {
      await selectRole(role);
      
      // توجيه المستخدم إلى لوحة التحكم المناسبة
      const routes = {
        customer: '/app/mall',
        designer: '/designer/dashboard',
        factory: '/factory/dashboard',
        marketer: '/marketer/dashboard',
      };
      
      router.push(routes[role]);
    } catch (error) {
      console.error('Error selecting role:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            أهلاً بك في تفصيل! 🎉
          </h1>
          <p className="text-xl text-gray-600">
            اختر دورك الأساسي لتبدأ رحلتك معنا
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <RoleCard
            icon={<ShoppingCart className="w-16 h-16 text-primary" />}
            title="أنا عميل / مشتري"
            description="جئت للتسوق والاستثمار في التصاميم الفريدة"
            onClick={() => handleRoleSelect('customer')}
          />
          
          <RoleCard
            icon={<Palette className="w-16 h-16 text-primary" />}
            title="أنا مصمم / مبدع"
            description="جئت لبيع إبداعاتي وتوثيقها كـ NFT"
            onClick={() => handleRoleSelect('designer')}
          />
          
          <RoleCard
            icon={<Factory className="w-16 h-16 text-primary" />}
            title="أنا مصنع / مزود خدمة"
            description="جئت لتقديم خدمات الإنتاج والتصنيع"
            onClick={() => handleRoleSelect('factory')}
          />
          
          <RoleCard
            icon={<Megaphone className="w-16 h-16 text-primary" />}
            title="أنا مسوّق / وكالة"
            description="جئت للترويج وكسب العمولات من المبيعات"
            onClick={() => handleRoleSelect('marketer')}
          />
        </div>
      </div>
    </div>
  );
}

function RoleCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="card hover:shadow-xl transition-all hover:scale-105 text-right"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">{icon}</div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </button>
  );
}
