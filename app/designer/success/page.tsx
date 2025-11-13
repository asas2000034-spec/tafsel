'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function DesignerSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          تهانينا! 🎉
        </h1>
        <p className="text-gray-600 mb-8">
          تصميمك معروض الآن للبيع كمنتج في المول. ستحصل على ربحك من كل عملية بيع!
        </p>
        
        <div className="space-y-3">
          <button
            onClick={() => router.push('/designer/dashboard')}
            className="btn-primary w-full"
          >
            العودة للوحة التحكم
          </button>
          <button
            onClick={() => router.push('/app/mall')}
            className="btn-secondary w-full"
          >
            عرض المنتج في المول
          </button>
        </div>
      </div>
    </div>
  );
}
