// app/api/image-proxy/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');
  
  if (!imageUrl) {
    return new NextResponse('Missing URL parameter', { status: 400 });
  }
  
  try {
    const response = await fetch(imageUrl, {
      // Increase timeout
      signal: AbortSignal.timeout(30000), // 30 seconds
    });
    
    const buffer = await response.arrayBuffer();
    const headers = new Headers(response.headers);
    
    return new NextResponse(buffer, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    return new NextResponse('Error fetching image', { status: 500 });
  }
}