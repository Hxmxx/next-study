import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/utils/database';

export async function GET() {
  try {
    const db = await connectDB;
    const posts = await db.db('board').collection('post').find({}).toArray();
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('게시글 조회 오류:', error);
    return NextResponse.json(
      { error: '게시글 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content } = await request.json();
    
    if (!title || !content) {
      return NextResponse.json(
        { error: '제목과 내용은 필수입니다.' },
        { status: 400 }
      );
    }

    const db = await connectDB;
    const result = await db.db('board').collection('post').insertOne({
      title,
      content,
      createdAt: new Date()
    });

    return NextResponse.json(
      { 
        message: '게시글이 성공적으로 생성되었습니다.',
        postId: result.insertedId 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('게시글 생성 오류:', error);
    return NextResponse.json(
      { error: '게시글 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
