import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ 
      textAlign: 'center', 
      padding: '50px 20px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>게시판</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '40px', color: '#666' }}>
        게시판 홈입니다.
      </h2>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px',
        alignItems: 'center'
      }}>
        <Link 
          href="/list" 
          style={{
            padding: '15px 30px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '18px',
            fontWeight: 'bold',
            minWidth: '200px'
          }}
        >
          게시글 목록 보기
        </Link>
        
        <Link 
          href="/write" 
          style={{
            padding: '15px 30px',
            backgroundColor: '#28a745',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '18px',
            fontWeight: 'bold',
            minWidth: '200px'
          }}
        >
          새 글 작성하기
        </Link>
      </div>
    </main>
  );
}