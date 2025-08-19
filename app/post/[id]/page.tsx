'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PostDetail() {
  const { id }  = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) {
          throw new Error('Post not found');
        }
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
        setPost({ error: true });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [id]);

  if (loading) return <div>로딩중...</div>;
  if (post && post.error) return <div>글을 찾을 수 없습니다.</div>;
  if (!post) return <div>글을 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <h4>{post.content}</h4>
      <br/>
      <span className = "button"><Link href="/list">목록으로</Link></span>
      <span className = "button"><Link href={`/post/${id}/edit`}>수정</Link></span>
    </div>
  );
}