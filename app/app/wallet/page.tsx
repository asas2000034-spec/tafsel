'use client';

import { useEffect, useState } from 'react';
import { useApp } from '@/lib/context';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Wallet as WalletIcon, Lock, Unlock, Plus } from 'lucide-react';

export default function WalletPage() {
  const { user, wallet, setWallet } = useApp();
  const [showTopUp, setShowTopUp] = useState(false);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'regular' | 'bnpl'>('bnpl');

  useEffect(() => {
    if (user?.id) {
      fetchWallet();
    }
  }, [user]);

  const fetchWallet = async () => {
    try {
      const response = await fetch(`/api/wallet/${user?.id}`);
      const data = await response.json();
      setWallet(data);
    } catch (error) {
      console.error('Error fetching wallet:', error);
    }
  };

  const handleTopUp = async () => {
    if (!amount || !user?.id) return;

    try {
      const response = await fetch('/api/wallet/topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          amount: parseFloat(amount),
          isBNPL: paymentMethod === 'bnpl',
        }),
      });
      const data = await response.json();
      setWallet(data);
      setShowTopUp(false);
      setAmount('');
    } catch (error) {
      console.error('Error topping up wallet:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">تفصيل كاش</h2>
          <p className="text-gray-600">إدارة رصيدك في المنصة</p>
        </div>

        {/* Balance Cards */}
        <div className="space-y-4 mb-8">
          <div className="card bg-gradient-to-br from-primary to-yellow-600 text-white">
            <div className="flex items-center gap-3 mb-2">
              <WalletIcon className="w-8 h-8" />
              <h3 className="text-lg font-medium">إجمالي الرصيد</h3>
            </div>
            <p className="text-4xl font-bold">{wallet?.totalBalance || 0} TFT</p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Unlock className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-medium text-gray-900">الرصيد الحر</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {wallet?.freeBalance || 0} TFT
              </p>
            </div>
            <p className="text-sm text-gray-500">
              متاح للاستخدام في أي مكان
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Lock className="w-6 h-6 text-orange-600" />
                <h3 className="text-lg font-medium text-gray-900">الرصيد المقفل</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {wallet?.lockedBalance || 0} TFT
              </p>
            </div>
            <p className="text-sm text-gray-500">
              🔒 للاستخدام داخل المنصة فقط - يُستخدم أولاً عند الشراء
            </p>
          </div>
        </div>

        {/* Top Up Button */}
        {!showTopUp && (
          <button
            onClick={() => setShowTopUp(true)}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            شحن المحفظة
          </button>
        )}

        {/* Top Up Form */}
        {showTopUp && (
          <div className="card space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">شحن المحفظة</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المبلغ (بالريال)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input-field"
                placeholder="1000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                طريقة الدفع
              </label>
              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod('regular')}
                  className={`w-full p-4 border-2 rounded-lg transition-all text-right ${
                    paymentMethod === 'regular'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-bold text-gray-900 mb-1">
                    شحن عادي (Mada / Apple Pay)
                  </div>
                  <div className="text-sm text-gray-600">
                    رصيد حر 100% - متاح للاستخدام في أي مكان
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('bnpl')}
                  className={`w-full p-4 border-2 rounded-lg transition-all text-right ${
                    paymentMethod === 'bnpl'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-bold text-gray-900 mb-1">
                    تمويل BNPL (تابي / تمارا) ⭐
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    0% فائدة - تقسيط مريح 70/30
                  </div>
                  {amount && (
                    <div className="text-sm bg-yellow-50 p-2 rounded">
                      ستحصل على: {parseFloat(amount) * 0.7} TFT رصيد حر + {parseFloat(amount) * 0.3} TFT رصيد مقفل
                    </div>
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleTopUp}
                className="btn-primary flex-1"
                disabled={!amount}
              >
                تأكيد الشحن
              </button>
              <button
                onClick={() => setShowTopUp(false)}
                className="btn-secondary flex-1"
              >
                إلغاء
              </button>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
