'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import { Megaphone, Plus, TrendingUp, DollarSign, MousePointer } from 'lucide-react';
import { Campaign } from '@/types';

export default function MarketerDashboard() {
  const { user, logout } = useApp();
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    totalClicks: 0,
    totalConversions: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    if (user?.id) {
      fetchCampaigns();
    }
  }, [user]);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch(`/api/campaigns?marketerId=${user?.id}`);
      const data = await response.json();
      setCampaigns(data);
      
      const totalClicks = data.reduce((sum: number, c: Campaign) => sum + c.clicks, 0);
      const totalConversions = data.reduce((sum: number, c: Campaign) => sum + c.conversions, 0);
      const totalRevenue = data.reduce((sum: number, c: Campaign) => sum + c.revenue, 0);
      
      setStats({
        totalCampaigns: data.length,
        totalClicks,
        totalConversions,
        totalRevenue,
      });
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Megaphone className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">لوحة المسوق</h1>
          </div>
          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            خروج
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center gap-3">
              <Megaphone className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-gray-600">إجمالي الحملات</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCampaigns}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3">
              <MousePointer className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">النقرات</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalClicks}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">التحويلات</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalConversions}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-gray-600">الأرباح</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue} TFT</p>
              </div>
            </div>
          </div>
        </div>

        {/* Create Campaign Button */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/marketer/new-campaign')}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            إنشاء حملة جديدة
          </button>
        </div>

        {/* Campaigns List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">حملاتي</h2>
          {campaigns.length === 0 ? (
            <div className="card text-center py-12">
              <Megaphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                لا توجد حملات بعد
              </h3>
              <p className="text-gray-600 mb-6">
                ابدأ بإنشاء حملتك الأولى وابدأ في كسب العمولات!
              </p>
              <button
                onClick={() => router.push('/marketer/new-campaign')}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                إنشاء حملة جديدة
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="card">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {campaign.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {new Date(campaign.createdAt).toLocaleDateString('ar-SA')}
                      </p>
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-bold text-primary">
                        {campaign.revenue} TFT
                      </div>
                      <div className="text-sm text-gray-600">أرباح</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {campaign.clicks}
                      </div>
                      <div className="text-sm text-gray-600">نقرة</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {campaign.conversions}
                      </div>
                      <div className="text-sm text-gray-600">تحويل</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {campaign.clicks > 0 
                          ? ((campaign.conversions / campaign.clicks) * 100).toFixed(1)
                          : 0}%
                      </div>
                      <div className="text-sm text-gray-600">معدل التحويل</div>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push(`/marketer/campaign/${campaign.id}`)}
                    className="btn-secondary w-full"
                  >
                    عرض التفاصيل
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
