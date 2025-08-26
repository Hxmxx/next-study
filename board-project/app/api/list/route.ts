import { NextResponse } from 'next/server';
import connectDB from '@/app/utils/database';

export async function GET() {
  try {
    const db = await connectDB;
    const posts = await db.db('board').collection('post').find({}).toArray();
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('게시글 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '게시글 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
