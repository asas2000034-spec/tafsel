"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type FormState = {
  email: string;
  password: string;
  confirm: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.email || !form.password || !form.confirm) {
      setError("فضلاً أكمل جميع الحقول.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("كلمة المرور وتأكيدها غير متطابقين.");
      return;
    }
    setError(null);
    router.push("/onboarding/role");
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-8 px-4 py-16 sm:px-6">
      <div className="space-y-3 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-700">
          خطوة 1 من 2
        </span>
        <h1 className="text-3xl font-bold text-neutral-900">إنشاء حساب جديد</h1>
        <p className="text-neutral-600">
          لن تستغرق العملية سوى دقيقة. بعدها ستختار الدور الذي يناسبك داخل
          المنصة.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-3xl border border-neutral-200 bg-white/90 p-8 shadow-lg"
      >
        <div className="space-y-2 text-right">
          <label htmlFor="email" className="block text-sm font-semibold">
            البريد الإلكتروني
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, email: event.target.value }))
            }
            className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-neutral-800 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
            placeholder="you@tafseel.com"
            required
          />
        </div>
        <div className="space-y-2 text-right">
          <label htmlFor="password" className="block text-sm font-semibold">
            كلمة المرور
          </label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, password: event.target.value }))
            }
            className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-neutral-800 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
            placeholder="••••••••"
            required
          />
        </div>
        <div className="space-y-2 text-right">
          <label htmlFor="confirm" className="block text-sm font-semibold">
            تأكيد كلمة المرور
          </label>
          <input
            id="confirm"
            type="password"
            value={form.confirm}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, confirm: event.target.value }))
            }
            className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-neutral-800 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
            placeholder="••••••••"
            required
          />
        </div>

        {error && (
          <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-full bg-neutral-900 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-neutral-900/10 transition hover:bg-neutral-700"
        >
          إنشاء حساب
        </button>
        <p className="text-center text-sm text-neutral-500">
          لديك حساب بالفعل؟{" "}
          <Link
            href="/login"
            className="font-semibold text-amber-600 hover:text-amber-500"
          >
            سجّل الدخول
          </Link>
        </p>
      </form>
    </main>
  );
}
