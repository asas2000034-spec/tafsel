'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import { Palette, Plus, TrendingUp, DollarSign } from 'lucide-react';
import { Design } from '@/types';

export default function DesignerDashboard() {
  const { user, logout } = useApp();
  const router = useRouter();
  const [designs, setDesigns] = useState<Design[]>([]);
  const [stats, setStats] = useState({
    totalDesigns: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    if (user?.id) {
      fetchDesigns();
    }
  }, [user]);

  const fetchDesigns = async () => {
    try {
      const response = await fetch(`/api/designs?designerId=${user?.id}`);
      const data = await response.json();
      setDesigns(data);
      setStats({
        totalDesigns: data.length,
        totalSales: 0, // سيتم حسابها من البيانات الفعلية
        totalRevenue: 0,
      });
    } catch (error) {
      console.error('Error fetching designs:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Palette className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">لوحة المصمم</h1>
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
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center gap-3">
              <Palette className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-gray-600">إجمالي التصاميم</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDesigns}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">إجمالي المبيعات</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSales}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-gray-600">إجمالي الأرباح</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue} TFT</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Button */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/designer/upload')}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            رفع تصميم جديد (Auto-Mint NFT)
          </button>
        </div>

        {/* Designs List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">تصاميمي</h2>
          {designs.length === 0 ? (
            <div className="card text-center py-12">
              <Palette className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                لا توجد تصاميم بعد
              </h3>
              <p className="text-gray-600 mb-6">
                ابدأ برفع تصميمك الأول وتوثيقه كـ NFT
              </p>
              <button
                onClick={() => router.push('/designer/upload')}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                رفع تصميم جديد
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {designs.map((design) => (
                <div key={design.id} className="card">
                  <div className="bg-gray-100 rounded-lg p-8 mb-4 flex items-center justify-center">
                    <div className="text-6xl">🎨</div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{design.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{design.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded ${
                      design.nftMinted
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {design.nftMinted ? '✓ موثق NFT' : 'قيد التوثيق'}
                    </span>
                    {design.mode && (
                      <span className="text-xs text-gray-600">
                        {design.mode === 'store' ? 'في المول' : 'في المزاد'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
