import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // في الواقع، ستقوم بالتحقق من كلمة المرور
    // هنا نبحث عن المستخدم أو نسجله إذا لم يكن موجوداً
    const userId = Math.random().toString(36).substring(7);
    const user = store.createUser({
      id: userId,
      email,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
