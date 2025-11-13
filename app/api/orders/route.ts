import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const { productId, customerId, total } = await request.json();

    // خصم من المحفظة
    store.deductFromWallet(customerId, total);

    // إنشاء الطلب
    const order = store.createOrder({
      id: Math.random().toString(36).substring(7),
      productId,
      customerId,
      status: 'pending',
      total,
      shippingAddress: 'الرياض، المملكة العربية السعودية',
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');
    
    if (customerId) {
      const orders = store.getOrdersByCustomer(customerId);
      return NextResponse.json(orders);
    }

    return NextResponse.json([]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
