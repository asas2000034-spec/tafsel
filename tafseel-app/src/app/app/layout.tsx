import type { ReactNode } from "react";
import { CustomerBottomNav } from "@/components/navigation/customer-nav";

export default function CustomerAreaLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-neutral-100 via-white to-neutral-200">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 pb-36 pt-10 sm:px-8 lg:pb-20">
        {children}
      </main>
      <div className="lg:mx-auto lg:max-w-5xl lg:px-8">
        <CustomerBottomNav />
      </div>
    </div>
  );
}
