import connectDB from "@/app/utils/database";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default async function Detail(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const db = await connectDB;
  const post = await db.db('board').collection('post').findOne({ _id: new ObjectId(id) });
  
  if (!post) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '40px',
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <h1 style={{ color: '#e74c3c', marginBottom: '20px' }}>⚠️ 게시글을 찾을 수 없습니다</h1>
          <p style={{ color: '#7f8c8d', marginBottom: '20px' }}>요청하신 게시글이 존재하지 않습니다.</p>
          <Link href="/list" style={{
            color: '#3498db',
            textDecoration: 'none',
            padding: '10px 20px',
            border: '1px solid #3498db',
            borderRadius: '5px',
            display: 'inline-block'
          }}>
            ← 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  // MongoDB 객체를 일반 JavaScript 객체로 변환
  const serializedPost = {
    _id: post._id.toString(),
    title: post.title,
    content: post.content,
    createdAt: post.createdAt
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '30px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h1 style={{
            color: '#2c3e50',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            margin: '0'
          }}>
            {serializedPost.title}
          </h1>
          <Link href="/list" style={{
            color: '#3498db',
            textDecoration: 'none',
            padding: '10px 20px',
            border: '1px solid #3498db',
            borderRadius: '5px',
            fontSize: '1rem'
          }}>
            ← 목록으로
          </Link>
        </div>
        
        <div style={{
          backgroundColor: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderRadius: '8px',
          padding: '25px',
          marginBottom: '20px'
        }}>
          <p style={{
            color: '#34495e',
            fontSize: '1.1rem',
            lineHeight: '1.8',
            margin: '0',
            whiteSpace: 'pre-wrap'
          }}>
            {serializedPost.content}
          </p>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          fontSize: '0.9rem',
          color: '#95a5a6',
          marginBottom: '20px'
        }}>
          <span>게시글 ID: {serializedPost._id}</span>
          <span>작성일: {serializedPost.createdAt ? new Date(serializedPost.createdAt).toLocaleDateString('ko-KR') : new Date().toLocaleDateString('ko-KR')}</span>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center'
        }}>
          <Link href={`/edit/${id}`} style={{
            backgroundColor: '#3498db',
            color: 'white',
            textDecoration: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: '500',
            display: 'inline-block'
          }}>
            ✏️ 수정하기
          </Link>
          <Link href={`/delete/${id}`} style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            textDecoration: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: '500',
            display: 'inline-block'
          }}>
            🗑️ 삭제하기
          </Link>
        </div>
      </div>
    </div>
  );
}