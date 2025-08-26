import connectDB from '../utils/database';
import Link from 'next/link';
import ListItem from './ListItem';

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt?: Date;
}

export default async function Home() {
  try {
    const db = await connectDB;
    const posts = await db.db('board').collection('post').find({}).toArray();
    
    // MongoDB 객체를 일반 JavaScript 객체로 변환
    const serializedPosts = posts.map(post => ({
      _id: post._id.toString(),
      title: post.title,
      content: post.content,
      createdAt: post.createdAt
    }));
    
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
          <h1 style={{
            textAlign: 'center',
            color: '#2c3e50',
            fontSize: '2.5rem',
            marginBottom: '10px',
            fontWeight: 'bold'
          }}>
            게시판 목록
          </h1>
          <Link href="/new"
          style={{
            display: 'block',
            textAlign: 'right',
            marginBottom: '10px'
          }}>
            <button style={{
              backgroundColor: '#3498db',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              textDecoration: 'none'
            }}>
              새 게시글 작성
            </button>
          </Link>

          <p style={{
            textAlign: 'center',
            color: '#7f8c8d',
            fontSize: '1.1rem',
            marginBottom: '30px'
          }}>
            다양한 게시글을 확인해보세요
          </p>

          {serializedPosts.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#95a5a6'
            }}>
              <p style={{ fontSize: '1.2rem' }}>게시글이 없습니다.</p>
              <p>첫 번째 게시글을 작성해보세요!</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gap: '20px'
            }}>
              {serializedPosts.map((post) => (
                <ListItem key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('데이터베이스 연결 오류:', error);
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
          <h1 style={{ color: '#e74c3c', marginBottom: '20px' }}>⚠️ 오류 발생</h1>
          <p style={{ color: '#e74c3c', marginBottom: '15px' }}>데이터베이스 연결에 실패했습니다.</p>
          <p style={{ color: '#7f8c8d' }}>환경변수와 MongoDB 연결을 확인해주세요.</p>
        </div>
      </div>
    );
  }
}