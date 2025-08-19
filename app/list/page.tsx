'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/posts');
      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      alert('게시글 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete post');
      }

      alert('게시글이 삭제되었습니다.');
      fetchPosts(); // 목록 새로고침
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  if (loading) return <div>로딩중...</div>;

  return (
    <main>
      <h1>게시물 목록</h1>
      <div style={{ marginBottom: '20px' }}>
        <Link href="/write" className="button">새 글 작성</Link>
      </div>
      {posts.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {posts.map((post: any) => (
            <li key={post.id} style={{ 
              border: '1px solid #ddd', 
              margin: '10px 0', 
              padding: '15px',
              borderRadius: '5px'
            }}>
              <Link href={`/post/${post.id}`} style={{ 
                textDecoration: 'none', 
                color: '#333',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>
                {post.title}
              </Link>
              <div style={{ 
                margin: '10px 0', 
                color: '#666',
                maxHeight: '60px',
                overflow: 'hidden'
              }}>
                {post.content}
              </div>
              <div style={{ marginTop: '10px' }}>
                <button 
                  className="button" 
                  onClick={() => handleDelete(post.id)}
                  style={{ marginRight: '10px' }}
                >
                  삭제
                </button>
                <Link href={`/post/${post.id}/edit`} className="button">수정</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}