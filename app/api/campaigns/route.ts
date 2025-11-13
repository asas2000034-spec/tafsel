import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const { name, productUrl, marketerId } = await request.json();
    
    const campaignId = Math.random().toString(36).substring(7);
    const trackingLink = `https://tafseel.com/track/${campaignId}`;
    const qrCode = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(trackingLink)}&size=300x300`;

    const campaign = store.createCampaign({
      id: campaignId,
      name,
      marketerId,
      productUrl,
      trackingLink,
      qrCode,
      clicks: 0,
      conversions: 0,
      revenue: 0,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(campaign);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create campaign' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const marketerId = searchParams.get('marketerId');
    
    if (marketerId) {
      const campaigns = store.getCampaignsByMarketer(marketerId);
      return NextResponse.json(campaigns);
    }

    return NextResponse.json([]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch campaigns' },
      { status: 500 }
    );
  }
}
