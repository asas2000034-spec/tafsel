'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaShoppingBag, FaGavel, FaWallet, FaClipboardList } from 'react-icons/fa'

export default function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { href: '/app/mall', icon: FaShoppingBag, label: 'المول' },
    { href: '/app/auction', icon: FaGavel, label: 'المزاد' },
    { href: '/app/wallet', icon: FaWallet, label: 'المحفظة' },
    { href: '/app/orders', icon: FaClipboardList, label: 'طلباتي' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-4 ${
                isActive ? 'text-primary' : 'text-gray-600'
              }`}
            >
              <Icon className="text-xl mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
