//app/api/posts/route.js
import { getPosts, addPost } from '@/app/data/posts';

export async function GET() {
  //작성
  const posts = getPosts();
  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST(request: Request) {
  const { title, content } = await request.json();
  //작성
  const newPost = addPost(title, content);
  return new Response(JSON.stringify(newPost), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}