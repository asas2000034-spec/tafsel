import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const { userId, amount, isBNPL } = await request.json();

    const wallet = store.topUpWallet(userId, amount, isBNPL);

    return NextResponse.json(wallet);
  } catch (error) {
    return NextResponse.json(
      { error: 'Top-up failed' },
      { status: 500 }
    );
  }
}
