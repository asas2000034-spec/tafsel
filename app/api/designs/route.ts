import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const designData = await request.json();
    const design = store.createDesign({
      id: Math.random().toString(36).substring(7),
      ...designData,
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json(design);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create design' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const designerId = searchParams.get('designerId');
    
    if (designerId) {
      const designs = store.getDesignsByDesigner(designerId);
      return NextResponse.json(designs);
    }

    return NextResponse.json([]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch designs' },
      { status: 500 }
    );
  }
}
