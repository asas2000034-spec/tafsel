import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // في الواقع، ستقوم بتشفير كلمة المرور والتحقق من البريد الإلكتروني
    const user = store.createUser({
      id: Math.random().toString(36).substring(7),
      email,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
