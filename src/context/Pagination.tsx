// src/components/Pagination.tsx
import React from 'react';

export const Pagination: React.FC<{ current: number; totalPages: number; setPage: (p: number) => void }> = ({ current, totalPages, setPage }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}>
      <button onClick={() => setPage(current - 1)} disabled={current <= 1}>Previous</button>
      {pages.map(p => (
        <button key={p} onClick={() => setPage(p)} aria-current={p === current ? 'page' : undefined}>
          {p}
        </button>
      ))}
      <button onClick={() => setPage(current + 1)} disabled={current >= totalPages}>Next</button>
    </div>
  );
};
