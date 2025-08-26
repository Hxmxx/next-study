import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  console.log('GET /api/test');
  return NextResponse.json({ message: '성공함' });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    return NextResponse.json({ received: body }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: '요청 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
