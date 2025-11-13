import { NextResponse } from 'next/server';
import { store } from '@/lib/store';
import { BlankProduct } from '@/types';

// إضافة بعض المنتجات الخام التجريبية
const sampleBlankProducts: BlankProduct[] = [
  {
    id: 'blank-1',
    name: 'تي شيرت بريميوم',
    description: 'قطن عالي الجودة 100%',
    baseCost: 50,
    colors: ['أبيض', 'أسود', 'رمادي', 'أزرق'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    factoryId: 'factory-1',
  },
  {
    id: 'blank-2',
    name: 'تي شيرت عادي',
    description: 'قطن عادي مريح',
    baseCost: 30,
    colors: ['أبيض', 'أسود'],
    sizes: ['M', 'L', 'XL'],
    factoryId: 'factory-1',
  },
  {
    id: 'blank-3',
    name: 'كوب سيراميك',
    description: 'كوب سيراميك للطباعة',
    baseCost: 25,
    colors: ['أبيض'],
    sizes: ['350ml'],
    factoryId: 'factory-1',
  },
];

export async function GET() {
  try {
    // في الواقع، ستجلب من قاعدة البيانات
    // هنا نستخدم البيانات التجريبية
    return NextResponse.json(sampleBlankProducts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blank products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const productData = await request.json();
    const product = store.createBlankProduct({
      id: Math.random().toString(36).substring(7),
      ...productData,
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create blank product' },
      { status: 500 }
    );
  }
}
