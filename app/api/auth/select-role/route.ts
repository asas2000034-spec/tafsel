import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const { userId, role } = await request.json();

    const user = store.updateUser(userId, { role });

    return NextResponse.json({ role: user?.role });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to select role' },
      { status: 500 }
    );
  }
}
