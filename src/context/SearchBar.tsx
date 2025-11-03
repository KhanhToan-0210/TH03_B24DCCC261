// src/components/SearchBar.tsx
import React from 'react';

export const SearchBar: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => {
  return <input placeholder="Tìm kiếm theo tên..." value={value} onChange={e => onChange(e.target.value)} />;
};
