import type { ReactNode } from "react";

export default function FactoryLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700 text-white">
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-24 pt-16 sm:px-8">
        {children}
      </main>
    </div>
  );
}
