'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt?: Date;
}

export default function Edit({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string>('');
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 컴포넌트가 마운트될 때 데이터를 가져옵니다
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const resolvedParams = await params;
        setId(resolvedParams.id);
        
        const response = await fetch(`/api/posts/${resolvedParams.id}`);
        if (response.ok) {
          const postData = await response.json();
          // MongoDB 객체를 일반 JavaScript 객체로 변환
          const serializedPost = {
            _id: postData._id,
            title: postData.title,
            content: postData.content,
            createdAt: postData.createdAt
          };
          setPost(serializedPost);
        }
      } catch (error) {
        console.error('게시글 로딩 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params]);

  if (loading) {
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
          padding: '40px',
          textAlign: 'center'
        }}>
          <p>로딩 중...</p>
        </div>
      </div>
    );
  }

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
          <p style={{ color: '#7f8c8d', marginBottom: '20px' }}>수정할 게시글이 존재하지 않습니다.</p>
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
            ✏️ 게시글 수정
          </h1>
          <Link href={`/detail/${id}`} style={{
            color: '#3498db',
            textDecoration: 'none',
            padding: '10px 20px',
            border: '1px solid #3498db',
            borderRadius: '5px',
            fontSize: '1rem'
          }}>
            ← 상세보기로
          </Link>
        </div>
        
        <form action="/api/posts/edit" method="POST" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#2c3e50',
              fontWeight: '600',
              fontSize: '1.1rem'
            }}>
              제목
            </label>
            <input 
              type="text" 
              name="title" 
              defaultValue={post.title}
              style={{
                color: 'black',
                width: '100%',
                padding: '15px',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              required
            />
          </div>
          
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#2c3e50',
              fontWeight: '600',
              fontSize: '1.1rem'
            }}>
              내용
            </label>
            <textarea 
              name="content" 
              defaultValue={post.content}
              rows={10}
              style={{
                color: 'black',
                width: '100%',
                padding: '15px',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                transition: 'border-color 0.2s'
              }}
              required
            />
          </div>
          
          <input type="hidden" name="_id" defaultValue={post._id} />
          
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            marginTop: '20px'
          }}>
            <button 
              type="submit"
              style={{
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              💾 수정 완료
            </button>
            <Link href={`/detail/${id}`} style={{
              backgroundColor: '#95a5a6',
              color: 'white',
              textDecoration: 'none',
              padding: '15px 30px',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              display: 'inline-block'
            }}>
              ❌ 취소
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}