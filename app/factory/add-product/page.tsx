'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import { ArrowRight } from 'lucide-react';

export default function AddProductPage() {
  const { user } = useApp();
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [baseCost, setBaseCost] = useState('');
  const [colors, setColors] = useState('');
  const [sizes, setSizes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await fetch('/api/blank-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          baseCost: parseFloat(baseCost),
          colors: colors.split(',').map(c => c.trim()),
          sizes: sizes.split(',').map(s => s.trim()),
          factoryId: user.id,
        }),
      });

      router.push('/factory/dashboard');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

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

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            إضافة منتج خام جديد
          </h1>
          <p className="text-gray-600">
            أضف منتجاً جديداً إلى كتالوجك ليستخدمه المصممون
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم المنتج
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                placeholder="مثال: تي شيرت بريميوم"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الوصف
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-field"
                rows={3}
                placeholder="اكتب وصفاً للمنتج..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الألوان المتاحة (افصل بينها بفاصلة)
              </label>
              <input
                type="text"
                value={colors}
                onChange={(e) => setColors(e.target.value)}
                className="input-field"
                placeholder="أبيض, أسود, رمادي"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المقاسات المتاحة (افصل بينها بفاصلة)
              </label>
              <input
                type="text"
                value={sizes}
                onChange={(e) => setSizes(e.target.value)}
                className="input-field"
                placeholder="S, M, L, XL, XXL"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                التكلفة الأساسية (بالـ TFT)
              </label>
              <input
                type="number"
                value={baseCost}
                onChange={(e) => setBaseCost(e.target.value)}
                className="input-field"
                placeholder="50"
                min="0"
                step="0.01"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                هذه هي التكلفة التي سيراها المصممون عند اختيار منتجك
              </p>
            </div>

            <button type="submit" className="btn-primary w-full">
              حفظ المنتج
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
