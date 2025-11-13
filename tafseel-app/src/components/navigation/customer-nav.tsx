"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    href: "/app/mall",
    label: "المول",
    icon: "🛍️",
  },
  {
    href: "/app/auctions",
    label: "المزاد",
    icon: "🏆",
  },
  {
    href: "/app/wallet",
    label: "المحفظة",
    icon: "💳",
  },
  {
    href: "/app/orders",
    label: "طلباتي",
    icon: "📦",
  },
];

export function CustomerBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-neutral-200 bg-white/90 backdrop-blur lg:static lg:border lg:rounded-3xl lg:px-8 lg:py-4">
      <div className="mx-auto flex max-w-4xl items-center justify-around gap-2 px-4 py-3 text-sm font-medium lg:justify-between">
        {items.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/app/mall" && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 rounded-full px-3 py-2 transition ${
                isActive
                  ? "bg-neutral-900 text-white shadow-lg"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              <span aria-hidden className="text-lg">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
