import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/utils/database';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const body = Object.fromEntries(formData.entries());
    
    // 기본 검증
    if (!body._id || !body.title || body.title.trim() === "") {
      return NextResponse.json(
        { error: '게시글 ID와 제목은 필수입니다.' },
        { status: 400 }
      );
    }

    const db = await connectDB;
    const result = await db.db('board').collection('post').updateOne(
      { _id: new ObjectId(body._id as string) },
      { 
        $set: { 
          title: body.title, 
          content: body.content ?? "",
          updatedAt: new Date()
        } 
      }
    );

    if (result.matchedCount === 1) {
      return NextResponse.redirect(new URL("/list", request.url), 302);
    } else {
      return NextResponse.json(
        { error: '수정할 게시글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('게시글 수정 오류:', error);
    return NextResponse.json(
      { error: '게시글 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
