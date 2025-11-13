'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import { ArrowRight } from 'lucide-react';
import { BlankProduct } from '@/types';

export default function SetupProductPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useApp();
  const [blankProducts, setBlankProducts] = useState<BlankProduct[]>([]);
  const [selectedBlank, setSelectedBlank] = useState<string>('');
  const [designerProfit, setDesignerProfit] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlankProducts();
  }, []);

  const fetchBlankProducts = async () => {
    try {
      const response = await fetch('/api/blank-products');
      const data = await response.json();
      setBlankProducts(data);
    } catch (error) {
      console.error('Error fetching blank products:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectedBlankProduct = blankProducts.find(p => p.id === selectedBlank);
  const platformFee = selectedBlankProduct ? selectedBlankProduct.baseCost * 0.3 : 0;
  const finalPrice = selectedBlankProduct 
    ? selectedBlankProduct.baseCost + platformFee + (parseFloat(designerProfit) || 0)
    : 0;

  const handlePublish = async () => {
    if (!selectedBlank || !designerProfit || !user) return;

    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${selectedBlankProduct?.name} - تصميم مخصص`,
          description: 'منتج بتصميم حصري',
          price: Math.round(finalPrice),
          category: 'clothing',
          designerId: user.id,
        }),
      });

      router.push('/designer/success');
    } catch (error) {
      console.error('Error publishing product:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowRight className="w-5 h-5" />
            <span>رجوع</span>
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            إعداد المنتج للبيع
          </h1>
          <p className="text-gray-600">
            اختر المنتج الخام والمصنع وحدد سعرك
          </p>
        </div>

        <div className="card space-y-6">
          {/* Step 1: Select Blank Product */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              الخطوة 1: اختر المنتج الخام
            </h3>
            <select
              value={selectedBlank}
              onChange={(e) => setSelectedBlank(e.target.value)}
              className="input-field"
            >
              <option value="">اختر المنتج...</option>
              {blankProducts.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - {product.baseCost} TFT
                </option>
              ))}
            </select>
          </div>

          {selectedBlankProduct && (
            <>
              {/* Product Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">
                  {selectedBlankProduct.name}
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  {selectedBlankProduct.description}
                </p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">الألوان: </span>
                    <span className="font-medium">{selectedBlankProduct.colors.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">المقاسات: </span>
                    <span className="font-medium">{selectedBlankProduct.sizes.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Step 2: Pricing */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  الخطوة 2: تحديد السعر
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">تكلفة المصنع</span>
                    <span className="font-bold text-gray-900">
                      {selectedBlankProduct.baseCost} TFT
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">عمولة تفصيل (30%)</span>
                    <span className="font-bold text-gray-900">
                      {platformFee.toFixed(0)} TFT
                    </span>
                  </div>
                  
                  <div className="p-3 bg-primary/5 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ربحك (أدخله هنا)
                    </label>
                    <input
                      type="number"
                      value={designerProfit}
                      onChange={(e) => setDesignerProfit(e.target.value)}
                      className="input-field"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                {designerProfit && (
                  <div className="border-t-2 border-primary pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">
                        السعر النهائي للعميل
                      </span>
                      <span className="text-3xl font-bold text-primary">
                        {Math.round(finalPrice)} TFT
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Publish Button */}
              <button
                onClick={handlePublish}
                className="btn-primary w-full"
                disabled={!designerProfit}
              >
                نشر في المول
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
