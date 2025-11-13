'use client';

import { useParams, useRouter } from 'next/navigation';
import { Store, Gavel, CheckCircle } from 'lucide-react';

export default function SelectModePage() {
  const params = useParams();
  const router = useRouter();

  const handleSelectMode = (mode: 'store' | 'auction') => {
    if (mode === 'store') {
      router.push(`/designer/setup-product/${params.id}`);
    } else {
      router.push('/designer/dashboard');
      // في المستقبل، سنوجهه لإعداد المزاد
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            رائع! تم توثيق تصميمك ✓
          </h1>
          <p className="text-xl text-gray-600">
            كيف تريد بيع تصميمك؟
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => handleSelectMode('store')}
            className="card hover:shadow-xl transition-all hover:scale-105 text-right"
          >
            <Store className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              البيع كمنتج ملموس
            </h3>
            <p className="text-gray-600 mb-4">
              اربط تصميمك بمنتج (تي شيرت، كوب...) وبعه في المول
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>✓ مبيعات مستمرة</li>
              <li>✓ ربح من كل قطعة تُباع</li>
              <li>✓ التصنيع على حسب الطلب</li>
            </ul>
          </button>

          <button
            onClick={() => handleSelectMode('auction')}
            className="card hover:shadow-xl transition-all hover:scale-105 text-right"
          >
            <Gavel className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              البيع كأصل رقمي
            </h3>
            <p className="text-gray-600 mb-4">
              بع تصميمك كـ NFT في المزاد لأعلى سعر
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>✓ بيع لمرة واحدة</li>
              <li>✓ عمولة من البيوعات المستقبلية</li>
              <li>✓ قيمة استثمارية عالية</li>
            </ul>
          </button>
        </div>
      </div>
    </div>
  );
}
