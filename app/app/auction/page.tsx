'use client';

import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Gavel } from 'lucide-react';

export default function AuctionPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">المزاد</h2>
          <p className="text-gray-600">تصفح المزادات النشطة</p>
        </div>

        <div className="card text-center py-12">
          <Gavel className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            قريباً!
          </h3>
          <p className="text-gray-600">
            سيتم إطلاق قسم المزادات قريباً
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
