'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ShoppingBag, Gavel, Wallet, Package } from 'lucide-react';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { icon: ShoppingBag, label: 'المول', path: '/app/mall' },
    { icon: Gavel, label: 'المزاد', path: '/app/auction' },
    { icon: Wallet, label: 'المحفظة', path: '/app/wallet' },
    { icon: Package, label: 'طلباتي', path: '/app/orders' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive
                    ? 'text-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
