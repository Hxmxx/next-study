//app/api/posts/[id]/route.js
import { getPost, updatePost, deletePost } from '../../../data/posts';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const post = getPost(Number(params.id));
  if (!post) {
    return new Response(JSON.stringify({ error: "Not found" }), { 
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  return new Response(JSON.stringify(post), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { title, content } = await request.json();
  const updated = updatePost(Number(params.id), title, content);
  if (!updated) {
    return new Response(JSON.stringify({ error: "Not found" }), { 
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  return new Response(JSON.stringify(updated), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const deleted = deletePost(Number(params.id));
  if (!deleted) {
    return new Response(JSON.stringify({ error: "Not found" }), { 
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  return new Response(JSON.stringify({ message: "Post deleted successfully" }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}