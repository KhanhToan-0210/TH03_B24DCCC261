// src/components/FilterPanel.tsx
import React from 'react';

export const FilterPanel: React.FC<{
  category: string;
  setCategory: (c: string) => void;
  minPrice: string;
  maxPrice: string;
  setMinPrice: (s: string) => void;
  setMaxPrice: (s: string) => void;
}> = ({ category, setCategory, minPrice, maxPrice, setMinPrice, setMaxPrice }) => {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">Tất cả danh mục</option>
        <option value="Điện tử">Điện tử</option>
        <option value="Quần áo">Quần áo</option>
        <option value="Đồ ăn">Đồ ăn</option>
        <option value="Sách">Sách</option>
        <option value="Khác">Khác</option>
      </select>
      <input placeholder="Giá từ" value={minPrice} onChange={e => setMinPrice(e.target.value)} style={{ width: 140 }} />
      <input placeholder="đến" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} style={{ width: 140 }} />
    </div>
  );
};
