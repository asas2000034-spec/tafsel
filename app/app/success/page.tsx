'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          تم الطلب بنجاح! 🎉
        </h1>
        <p className="text-gray-600 mb-8">
          شكراً لك! تم استلام طلبك وسيتم معالجته قريباً.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={() => router.push('/app/orders')}
            className="btn-primary w-full"
          >
            عرض طلباتي
          </button>
          <button
            onClick={() => router.push('/app/mall')}
            className="btn-secondary w-full"
          >
            العودة للمول
          </button>
          <button
            onClick={() => router.push('/app/wallet')}
            className="text-primary hover:underline"
          >
            عرض المحفظة
          </button>
        </div>
      </div>
    </div>
  );
}
