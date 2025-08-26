'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt?: Date;
}

interface ListItemProps {
  post: Post;
}

export default function ListItem({ post }: ListItemProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`/api/posts/${post._id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('게시글이 삭제되었습니다.');
          router.refresh(); // 화면 새로고침
        } else {
          const error = await response.json();
          alert(`삭제 실패: ${error.error}`);
        }
      } catch (error) {
        console.error('삭제 오류:', error);
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      border: '1px solid #e9ecef',
      borderRadius: '8px',
      padding: '20px',
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    }}>
      <Link href={`/detail/${post._id}`} style={{ textDecoration: 'none' }}>
        <h2 style={{
          color: '#2c3e50',
          fontSize: '1.4rem',
          marginBottom: '10px',
          fontWeight: '600',
          borderBottom: '2px solid #3498db',
          paddingBottom: '8px',
          cursor: 'pointer'
        }}>
          {post.title}
        </h2>
      </Link>
      <p style={{
        color: '#34495e',
        fontSize: '1rem',
        lineHeight: '1.6',
        margin: '0'
      }}>
        {post.content}
      </p>
      <div style={{
        marginTop: '15px',
        paddingTop: '15px',
        borderTop: '1px solid #ecf0f1',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.9rem',
        color: '#95a5a6'
      }}>
        <span>ID: {post._id.slice(-6)}</span>
        <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString('ko-KR') : new Date().toLocaleDateString('ko-KR')}</span>
      </div>
      
      <div style={{
        marginTop: '15px',
        display: 'flex',
        gap: '10px',
        justifyContent: 'flex-end'
      }}>
        <Link href={`/edit/${post._id}`}>
          <button style={{
            backgroundColor: '#f39c12',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}>
            ✏️ 수정
          </button>
        </Link>
        
        <button
          onClick={handleDelete}
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          🗑️ 삭제
        </button>
        
        <button
          className="list-btn dynamic-btn"
          onClick={async () => {
            try {
              const response = await fetch(`/api/posts/${post._id}`, {
                method: 'DELETE',
              });
              
              if (response.ok) {
                alert('다이나믹 라우터로 삭제 성공!');
                router.refresh(); // 화면 새로고침
              } else {
                const error = await response.json();
                alert(`삭제 실패: ${error.error}`);
              }
            } catch (error) {
              console.error('삭제 오류:', error);
              alert('삭제 중 오류가 발생했습니다.');
            }
          }}
          style={{
            backgroundColor: '#9b59b6',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          다이나믹 라우터로 삭제해보기
        </button>
      </div>
    </div>
  );
}
