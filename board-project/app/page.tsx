'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px'
    }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e74c3c', marginBottom: '20px' }}>게시판</h1>
      <Link href="/list" style={{ color: '#3498db', textDecoration: 'none', fontSize: '1.2rem' }}>게시판으로 이동</Link>
      
      <button
        onClick={() => {
          fetch("api/test?name=kim&age=20")
            .then(r => { return r.json() })
            .then(r => alert(JSON.stringify(r)))
        }}
        style={{
          backgroundColor: '#9b59b6',
          color: 'white',
          border: 'none',
          padding: '15px 30px',
          borderRadius: '8px',
          fontSize: '1.1rem',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        쿼리 & 다이나믹 라우터 연습
      </button>
    </div>
  );
}