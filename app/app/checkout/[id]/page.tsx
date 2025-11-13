'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import Header from '@/components/Header';
import { Product } from '@/types';
import { Lock } from 'lucide-react';

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const { user, wallet, setWallet } = useApp();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string);
    }
  }, [params.id]);

  const fetchProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPurchase = async () => {
    if (!product || !user || !wallet) return;

    setProcessing(true);
    try {
      // خصم من المحفظة
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          customerId: user.id,
          total: product.price,
        }),
      });

      if (response.ok) {
        // تحديث المحفظة
        const walletResponse = await fetch(`/api/wallet/${user.id}`);
        const walletData = await walletResponse.json();
        setWallet(walletData);

        // الانتقال إلى صفحة النجاح
        router.push('/app/success');
      }
    } catch (error) {
      console.error('Error processing purchase:', error);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">جاري التحميل...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">المنتج غير موجود</div>
      </div>
    );
  }

  const willUseLockedBalance = wallet && wallet.lockedBalance > 0;
  const lockedToUse = Math.min(wallet?.lockedBalance || 0, product.price);
  const freeToUse = Math.max(0, product.price - lockedToUse);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">تأكيد الطلب</h1>

        <div className="card space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">ملخص الطلب</h2>
            
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-4xl">
                {product.category === 'clothing' ? '👕' : '☕'}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
              <div className="text-xl font-bold text-primary">
                {product.price} TFT
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">تفاصيل الدفع</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-700">
                <span>المبلغ الإجمالي:</span>
                <span className="font-bold">{product.price} TFT</span>
              </div>
              
              {willUseLockedBalance && (
                <>
                  <div className="flex justify-between text-orange-600">
                    <span className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      من الرصيد المقفل:
                    </span>
                    <span className="font-bold">-{lockedToUse} TFT</span>
                  </div>
                  {freeToUse > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>من الرصيد الحر:</span>
                      <span className="font-bold">-{freeToUse} TFT</span>
                    </div>
                  )}
                </>
              )}
            </div>

            {willUseLockedBalance && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
                <p className="text-yellow-800">
                  <strong>ملاحظة:</strong> سيتم الخصم من رصيدك المقفل ({wallet?.lockedBalance} TFT) أولاً، 
                  ثم من الرصيد الحر إذا لزم الأمر.
                </p>
              </div>
            )}
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">عنوان الشحن</h3>
            <input
              type="text"
              className="input-field"
              placeholder="أدخل عنوان الشحن الكامل"
              defaultValue="الرياض، المملكة العربية السعودية"
            />
          </div>

          <button
            onClick={handleConfirmPurchase}
            className="btn-primary w-full"
            disabled={processing}
          >
            {processing ? 'جاري المعالجة...' : 'تأكيد الدفع'}
          </button>
        </div>
      </div>
    </div>
  );
}
