'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import { Upload, ArrowRight } from 'lucide-react';

export default function UploadDesignPage() {
  const { user } = useApp();
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !file) return;

    setUploading(true);
    try {
      // في الواقع، ستقوم برفع الملف وتوثيقه كـ NFT
      const response = await fetch('/api/designs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          designerId: user.id,
          imageUrl: '/placeholder-design.jpg',
          nftMinted: true,
        }),
      });

      const design = await response.json();
      
      // الانتقال إلى صفحة اختيار وضع البيع
      router.push(`/designer/select-mode/${design.id}`);
    } catch (error) {
      console.error('Error uploading design:', error);
    } finally {
      setUploading(false);
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
            رفع تصميم جديد
          </h1>
          <p className="text-gray-600">
            سيتم توثيق تصميمك كـ NFT على Polygon لحفظ حقوقك
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ملف التصميم
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="file-upload"
                  required
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    {file ? file.name : 'اضغط لرفع ملف التصميم'}
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, SVG حتى 10MB
                  </p>
                </label>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم التصميم
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                placeholder="مثال: تصميم هندسي عصري"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الوصف
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-field"
                rows={4}
                placeholder="اكتب وصفاً مفصلاً لتصميمك..."
                required
              />
            </div>

            {/* NFT Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-bold text-blue-900 mb-2">
                🔒 توثيق NFT تلقائي
              </h3>
              <p className="text-sm text-blue-800">
                عند رفع التصميم، سيتم توثيقه تلقائياً كـ NFT على شبكة Polygon
                لحماية حقوقك الفكرية وإثبات ملكيتك للتصميم.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={uploading || !file}
            >
              {uploading ? 'جاري الرفع والتوثيق...' : 'توثيق وحفظ الحقوق'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
