'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowRight, Copy, Download, CheckCircle } from 'lucide-react';
import { Campaign } from '@/types';

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchCampaign(params.id as string);
    }
  }, [params.id]);

  const fetchCampaign = async (id: string) => {
    try {
      const response = await fetch(`/api/campaigns/${id}`);
      const data = await response.json();
      setCampaign(data);
    } catch (error) {
      console.error('Error fetching campaign:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">جاري التحميل...</div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">الحملة غير موجودة</div>
      </div>
    );
  }

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

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
            تم إنشاء حملتك بنجاح!
          </h1>
          <p className="text-center text-gray-600">
            {campaign.name}
          </p>
        </div>

        {/* Tracking Link */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">رابط التتبع</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={campaign.trackingLink}
              readOnly
              className="input-field flex-1"
            />
            <button
              onClick={() => handleCopy(campaign.trackingLink)}
              className="btn-primary flex items-center gap-2 whitespace-nowrap"
            >
              <Copy className="w-5 h-5" />
              {copied ? 'تم النسخ!' : 'نسخ'}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            شارك هذا الرابط مع جمهورك لتتبع المبيعات
          </p>
        </div>

        {/* QR Code */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">رمز QR</h2>
          <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center mb-4">
            <div className="w-48 h-48 bg-white border-4 border-gray-300 rounded-lg flex items-center justify-center">
              <div className="text-6xl">📱</div>
            </div>
          </div>
          <button className="btn-secondary w-full flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            تحميل QR Code
          </button>
          <p className="text-sm text-gray-500 mt-2">
            استخدم رمز QR في الإعلانات المطبوعة أو على وسائل التواصل
          </p>
        </div>

        {/* Stats */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">إحصائيات الحملة</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {campaign.clicks}
              </div>
              <div className="text-sm text-gray-600">إجمالي النقرات</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {campaign.conversions}
              </div>
              <div className="text-sm text-gray-600">التحويلات</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-primary mb-1">
                {campaign.revenue} TFT
              </div>
              <div className="text-sm text-gray-600">الأرباح</div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="card mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            نصائح لزيادة مبيعاتك
          </h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>✓ شارك الرابط على جميع منصات التواصل الاجتماعي</li>
            <li>✓ استخدم QR Code في الإعلانات المطبوعة</li>
            <li>✓ أنشئ محتوى جذاب حول المنتج</li>
            <li>✓ تابع أداء حملتك بانتظام</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
