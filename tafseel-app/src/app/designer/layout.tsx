import type { ReactNode } from "react";

export default function DesignerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-neutral-100">
      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-4 pb-24 pt-16 sm:px-6">
        {children}
      </main>
    </div>
  );
}
