'use client';

import { useRouter } from 'next/navigation';
import { ShoppingBag, Zap, Shield, TrendingUp } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">تفصيل</h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/login')}
              className="btn-secondary"
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => router.push('/register')}
              className="btn-primary"
            >
              إنشاء حساب
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            مرحباً بك في منصة <span className="text-primary">تفصيل</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            منصة متكاملة للتصاميم والمنتجات المخصصة مع نظام توثيق NFT وتمويل BNPL
          </p>
          <button
            onClick={() => router.push('/register')}
            className="btn-primary text-lg px-8 py-4"
          >
            ابدأ رحلتك الآن
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <FeatureCard
            icon={<ShoppingBag className="w-12 h-12 text-primary" />}
            title="مول إلكتروني"
            description="تسوق من آلاف المنتجات المخصصة بتصاميم فريدة"
          />
          <FeatureCard
            icon={<Shield className="w-12 h-12 text-primary" />}
            title="توثيق NFT"
            description="احمِ حقوقك الفكرية بتوثيق تصاميمك على البلوكشين"
          />
          <FeatureCard
            icon={<Zap className="w-12 h-12 text-primary" />}
            title="تمويل BNPL"
            description="اشترِ الآن وادفع لاحقاً بنظام 70/30 بدون فوائد"
          />
          <FeatureCard
            icon={<TrendingUp className="w-12 h-12 text-primary" />}
            title="نظام تسويق"
            description="اكسب عمولات من الترويج للمنتجات"
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          منتجات مميزة
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <ProductCard
            image="🎨"
            name="تي شيرت بتصميم حصري"
            price={150}
          />
          <ProductCard
            image="☕"
            name="كوب قهوة مخصص"
            price={75}
          />
          <ProductCard
            image="👕"
            name="تي شيرت بريميوم"
            price={200}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 تفصيل. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="card text-center hover:shadow-lg transition-shadow">
      <div className="flex justify-center mb-4">{icon}</div>
      <h4 className="text-xl font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function ProductCard({ image, name, price }: { image: string; name: string; price: number }) {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="text-6xl text-center mb-4">{image}</div>
      <h4 className="text-lg font-bold text-gray-900 mb-2">{name}</h4>
      <p className="text-2xl font-bold text-primary">{price} TFT</p>
    </div>
  );
}
