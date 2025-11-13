"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useWallet } from "@/app/providers";
import { Card } from "@/components/ui/card";

type Method = "standard" | "bnpl";

export default function WalletPage() {
  const searchParams = useSearchParams();
  const { state, topUpBNPL, topUpStandard, reset } = useWallet();
  const [showModal, setShowModal] = useState(false);
  const [method, setMethod] = useState<Method>("bnpl");
  const [amount, setAmount] = useState(1000);
  const [feedback, setFeedback] = useState<string | null>(null);

  const statusBanner = useMemo(() => {
    if (feedback) return feedback;
    if (searchParams.get("status") === "purchase-success") {
      return "تم الدفع بنجاح! استخدمنا الرصيد المقفل أولاً ثم الرصيد الحر إذا لزم الأمر.";
    }
    return null;
  }, [feedback, searchParams]);

  const handleTopUp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (method === "bnpl") {
      topUpBNPL(amount);
      setFeedback(
        `تم تفعيل تمويل BNPL بقيمة ${amount} TFT. تمت إضافة ${Math.round(amount * 0.7)} TFT إلى الرصيد الحر و${amount - Math.round(amount * 0.7)} TFT إلى الرصيد المقفل.`,
      );
    } else {
      topUpStandard(amount);
      setFeedback(
        `تم شحن المحفظة بمبلغ ${amount} TFT. الرصيد متاح بالكامل للاستخدام.`,
      );
    }
    setShowModal(false);
  };

  return (
    <section className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm font-semibold text-neutral-900">المحفظة</p>
        <h1 className="text-3xl font-bold text-neutral-900">تفصيل كاش</h1>
        <p className="text-neutral-600">
          تابع رصيدك الحر والمقفل، وابدأ الشحن بسهولة عبر تمويل BNPL أو الدفع
          المباشر.
        </p>
      </header>

      {statusBanner && (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-6 py-4 text-sm font-medium text-emerald-700">
          {statusBanner}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="rounded-3xl bg-gradient-to-br from-amber-50 to-white text-center">
          <p className="text-sm text-neutral-500">إجمالي الرصيد</p>
          <p className="mt-2 text-4xl font-bold text-amber-600">
            {state.total} TFT
          </p>
        </Card>
        <Card className="rounded-3xl text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-neutral-500">
            <span>الرصيد الحر</span>
            <span aria-hidden className="text-lg">
              <span role="img" aria-label="قفل مفتوح">
                🔓
              </span>
            </span>
          </div>
          <p className="mt-2 text-3xl font-semibold text-neutral-900">
            {state.free} TFT
          </p>
        </Card>
        <Card className="rounded-3xl text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-neutral-500">
            <span>الرصيد المقفل</span>
            <span aria-hidden className="text-lg">
              <span role="img" aria-label="قفل مغلق">
                🔒
              </span>
            </span>
          </div>
          <p className="mt-2 text-3xl font-semibold text-neutral-900">
            {state.locked} TFT
          </p>
          <p className="mt-2 text-xs text-neutral-400">
            للاستخدام داخل المنصة وتمويل الطلبات القادمة.
          </p>
        </Card>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="rounded-full bg-neutral-900 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-neutral-700"
        >
          + شحن المحفظة
        </button>
        <button
          type="button"
          onClick={() => {
            reset();
            setFeedback("تم إعادة تعيين المحفظة للحالة الابتدائية (0 TFT).");
          }}
          className="rounded-full border border-neutral-300 px-6 py-3 text-base font-semibold text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900"
        >
          إعادة ضبط المحفظة
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-neutral-900">
                اختر طريقة الشحن
              </h2>
              <button
                type="button"
                className="text-2xl text-neutral-400 transition hover:text-neutral-600"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleTopUp} className="mt-6 space-y-6">
              <div className="grid gap-4">
                <label className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-neutral-200 px-4 py-4 transition hover:border-neutral-900">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-neutral-900">
                      شحن عادي (مدى / Apple Pay)
                    </span>
                    <input
                      type="radio"
                      name="method"
                      checked={method === "standard"}
                      onChange={() => setMethod("standard")}
                    />
                  </div>
                  <p className="text-sm text-neutral-500">رصيد حر 100%</p>
                </label>
                <label className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-amber-400 bg-amber-50 px-4 py-4 transition hover:border-neutral-900">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-neutral-900">
                      تمويل BNPL (تابي / تمارا)
                    </span>
                    <input
                      type="radio"
                      name="method"
                      checked={method === "bnpl"}
                      onChange={() => setMethod("bnpl")}
                    />
                  </div>
                  <p className="text-sm text-amber-700">
                    0% فائدة - تقسيم تلقائي 70/30
                  </p>
                </label>
              </div>

              <div className="space-y-2">
                <label htmlFor="amount" className="block text-sm font-semibold">
                  المبلغ (TFT)
                </label>
                <input
                  id="amount"
                  type="number"
                  min={100}
                  step={50}
                  value={amount}
                  onChange={(event) => setAmount(Number(event.target.value))}
                  className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-neutral-800 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
                />
              </div>

              {method === "bnpl" ? (
                <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
                  ستحصل على {Math.round(amount * 0.7)} TFT رصيد حر و{" "}
                  {amount - Math.round(amount * 0.7)} TFT رصيد مقفل لاستخدامه في
                  مشتريات المنصة.
                </p>
              ) : (
                <p className="rounded-2xl bg-neutral-100 px-4 py-3 text-sm text-neutral-600">
                  سيتم إضافة كامل المبلغ إلى رصيدك الحر فوراً.
                </p>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-neutral-900 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-neutral-700"
                >
                  تأكيد الشحن
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-full border border-neutral-300 px-6 py-3 text-base font-semibold text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
