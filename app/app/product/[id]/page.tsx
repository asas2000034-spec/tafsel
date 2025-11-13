'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import Header from '@/components/Header';
import { Product } from '@/types';
import { ArrowRight } from 'lucide-react';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { user, wallet } = useApp();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

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

  const handleBuy = () => {
    if (!product) return;
    router.push(`/app/checkout/${product.id}`);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowRight className="w-5 h-5" />
          <span>رجوع</span>
        </button>

        <div className="card">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="bg-gray-100 rounded-lg p-12 flex items-center justify-center">
              <div className="text-9xl">
                {product.category === 'clothing' ? '👕' : '☕'}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <div className="mb-8">
                <div className="text-4xl font-bold text-primary mb-2">
                  {product.price} TFT
                </div>
                {wallet && (
                  <div className="text-sm text-gray-600">
                    رصيدك الحالي: {wallet.totalBalance} TFT
                  </div>
                )}
              </div>

              <button
                onClick={handleBuy}
                className="btn-primary w-full"
                disabled={!wallet || wallet.totalBalance < product.price}
              >
                {!wallet || wallet.totalBalance < product.price
                  ? 'رصيد غير كافٍ'
                  : 'اشتر الآن'}
              </button>

              {wallet && wallet.totalBalance < product.price && (
                <button
                  onClick={() => router.push('/app/wallet')}
                  className="btn-secondary w-full mt-3"
                >
                  شحن المحفظة
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
