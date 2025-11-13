'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowRight, Download, Printer, CheckCircle } from 'lucide-react';
import { Order, Product } from '@/types';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchOrder(params.id as string);
    }
  }, [params.id]);

  const fetchOrder = async (orderId: string) => {
    try {
      // في الواقع، ستجلب من API
      // هنا نستخدم بيانات تجريبية
      const mockOrder: Order = {
        id: orderId,
        productId: '1',
        customerId: 'cust-1',
        status: 'pending',
        total: 200,
        shippingAddress: 'الرياض، حي النخيل، شارع الملك عبدالعزيز',
        createdAt: new Date().toISOString(),
      };
      
      const mockProduct: Product = {
        id: '1',
        name: 'تي شيرت بتصميم حصري',
        description: 'تي شيرت قطني مريح بتصميم فني فريد',
        price: 200,
        image: '/products/tshirt1.jpg',
        category: 'clothing',
      };

      setOrder(mockOrder);
      setProduct(mockProduct);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: Order['status']) => {
    if (!order) return;

    try {
      const response = await fetch(`/api/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setOrder({ ...order, status: newStatus });
        
        if (newStatus === 'shipped') {
          alert('✓ تم تأكيد الشحن! سيتم توزيع الأرباح تلقائياً.');
          router.push('/factory/dashboard');
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">جاري التحميل...</div>
      </div>
    );
  }

  if (!order || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">الطلب غير موجود</div>
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

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          تفاصيل الطلب #{order.id}
        </h1>

        <div className="space-y-6">
          {/* Order Info */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">معلومات الطلب</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">المنتج:</span>
                <span className="font-medium">{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">المبلغ الإجمالي:</span>
                <span className="font-bold text-primary">{order.total} TFT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">تاريخ الطلب:</span>
                <span className="font-medium">
                  {new Date(order.createdAt).toLocaleString('ar-SA')}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">عنوان الشحن</h2>
            <p className="text-gray-700">{order.shippingAddress}</p>
          </div>

          {/* Design File */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">ملف التصميم</h2>
            <button className="btn-secondary flex items-center gap-2">
              <Download className="w-5 h-5" />
              تحميل ملف التصميم للطباعة
            </button>
            <p className="text-sm text-gray-500 mt-2">
              الملف محمي ومشفر. يمكنك تحميله مرة واحدة فقط.
            </p>
          </div>

          {/* Actions */}
          <div className="card space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">إجراءات</h2>
            
            <button className="btn-secondary w-full flex items-center justify-center gap-2">
              <Printer className="w-5 h-5" />
              طباعة بوليصة الشحن
            </button>

            {order.status === 'pending' && (
              <button
                onClick={() => handleStatusUpdate('processing')}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                تأكيد بدء الإنتاج
              </button>
            )}

            {order.status === 'processing' && (
              <button
                onClick={() => handleStatusUpdate('shipped')}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                تأكيد الشحن
              </button>
            )}

            {order.status === 'shipped' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <p className="text-green-700 font-medium">
                  تم شحن الطلب بنجاح!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
