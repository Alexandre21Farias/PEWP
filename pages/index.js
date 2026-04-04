import React from 'react'

export default function Home() {
  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        color: '#333',
      }}
    >
      <h1 style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
        pwep
      </h1>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
        Este é um projeto fullstack minimalista. O objetivo é manter o código
        simples, direto e funcional.
      </p>

      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
        }}
      >
        <h3>Links Úteis</h3>
        <ul>
          <li>
            <a href="/api/v1/status" style={{ color: '#0070f3' }}>
              Ver Status da API
            </a>
          </li>
        </ul>
      </div>

      <footer style={{ marginTop: '4rem', fontSize: '0.9rem', color: '#888' }}>
        pwep
      </footer>
    </div>
  )
}
