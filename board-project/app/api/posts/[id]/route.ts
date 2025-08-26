import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/utils/database';
import { ObjectId } from 'mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { error: '게시글 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const db = await connectDB;
    const post = await db.db('board').collection('post').findOne({
      _id: new ObjectId(id)
    });

    if (!post) {
      return NextResponse.json(
        { error: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // MongoDB ObjectId를 문자열로 변환하여 반환
    const serializedPost = {
      _id: post._id.toString(),
      title: post.title,
      content: post.content,
      createdAt: post.createdAt
    };

    return NextResponse.json(serializedPost);
  } catch (error) {
    console.error('게시글 조회 오류:', error);
    return NextResponse.json(
      { error: '게시글 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title, content } = await request.json();
    
    if (!title || !content) {
      return NextResponse.json(
        { error: '제목과 내용은 필수입니다.' },
        { status: 400 }
      );
    }

    const db = await connectDB;
    const result = await db.db('board').collection('post').updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, content } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: '게시글이 성공적으로 수정되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('게시글 수정 오류:', error);
    return NextResponse.json(
      { error: '게시글 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { error: '게시글 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const db = await connectDB;
    const result = await db.db('board').collection('post').deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 1) {
      return NextResponse.json(
        { message: '게시글이 성공적으로 삭제되었습니다.' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: '삭제할 게시글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('게시글 삭제 오류:', error);
    return NextResponse.json(
      { error: '게시글 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
