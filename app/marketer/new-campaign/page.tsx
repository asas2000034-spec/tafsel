'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import { ArrowRight } from 'lucide-react';

export default function NewCampaignPage() {
  const { user } = useApp();
  const router = useRouter();
  const [name, setName] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [creating, setCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setCreating(true);
    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          productUrl,
          marketerId: user.id,
        }),
      });

      const campaign = await response.json();
      router.push(`/marketer/campaign/${campaign.id}`);
    } catch (error) {
      console.error('Error creating campaign:', error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowRight className="w-5 h-5" />
            <span>رجوع</span>
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            إنشاء حملة جديدة
          </h1>
          <p className="text-gray-600">
            أنشئ رابط تتبع لمنتج من المول أو المزاد وابدأ في كسب العمولات
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم الحملة
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                placeholder="مثال: تي شيرت المصمم أحمد"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                اختر اسماً يساعدك على تتبع حملتك
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رابط المنتج
              </label>
              <input
                type="url"
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                className="input-field"
                placeholder="https://tafseel.com/app/product/123"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                الصق رابط المنتج من المول أو المزاد
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-bold text-blue-900 mb-2">
                💰 نظام العمولات
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• ستحصل على عمولة من كل عملية بيع تتم عبر رابطك</li>
                <li>• يتم تتبع النقرات والتحويلات تلقائياً</li>
                <li>• الأرباح تُضاف لمحفظتك فوراً</li>
              </ul>
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={creating}
            >
              {creating ? 'جاري الإنشاء...' : 'إنشاء الحملة'}
            </button>
          </form>
        </div>

        {/* How to Use */}
        <div className="card mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            كيف تستخدم الحملة؟
          </h3>
          <ol className="text-sm text-gray-700 space-y-2">
            <li>1. انسخ رابط التتبع أو QR Code</li>
            <li>2. شاركه على وسائل التواصل الاجتماعي</li>
            <li>3. تابع أداء حملتك في لوحة التحكم</li>
            <li>4. احصل على عمولاتك تلقائياً!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
