'use client';

import { useApp } from '@/lib/context';
import { useRouter } from 'next/navigation';
import { ShoppingBag, LogOut, User } from 'lucide-react';

export default function Header() {
  const { user, logout } = useApp();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold text-gray-900">تفصيل</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-600">{user?.email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">خروج</span>
          </button>
        </div>
      </div>
    </header>
  );
}
