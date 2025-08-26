'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function New() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        alert('게시글이 성공적으로 작성되었습니다!');
        router.push('/list');
      } else {
        const error = await response.json();
        alert(`작성 실패: ${error.error}`);
      }
    } catch (error) {
      console.error('게시글 작성 오류:', error);
      alert('게시글 작성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
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
            ✍️ 새 게시글 작성
          </h1>
          <button 
            onClick={() => router.push('/list')}
            style={{
              color: '#3498db',
              textDecoration: 'none',
              padding: '10px 20px',
              border: '1px solid #3498db',
              borderRadius: '5px',
              fontSize: '1rem',
              backgroundColor: 'transparent',
              cursor: 'pointer'
            }}
          >
            ← 목록으로
          </button>
        </div>
        
        <form onSubmit={handleSubmit} style={{
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
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
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
              placeholder="게시글 제목을 입력하세요"
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
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
              placeholder="게시글 내용을 입력하세요"
              required
            />
          </div>
          
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            marginTop: '20px'
          }}>
            <button 
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: loading ? '#95a5a6' : '#3498db',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              {loading ? '작성 중...' : '💾 게시글 작성'}
            </button>
            <button 
              type="button"
              onClick={() => router.push('/list')}
              style={{
                backgroundColor: '#95a5a6',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              ❌ 취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}