// src/pages/ProductListPage.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { ProductCard } from '../components/ProductCard';
import { Pagination } from '../components/Pagination';

export const ProductListPage: React.FC = () => {
  const { state, dispatch } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return state.products.filter(p => {
      if (q && !p.ten.toLowerCase().includes(q)) return false;
      if (category && p.danhMuc !== category) return false;
      if (minPrice) {
        const m = Number(minPrice);
        if (!Number.isNaN(m) && p.gia < m) return false;
      }
      if (maxPrice) {
        const M = Number(maxPrice);
        if (!Number.isNaN(M) && p.gia > M) return false;
      }
      return true;
    });
  }, [state.products, search, category, minPrice, maxPrice]);

  useEffect(() => { setPage(1); }, [search, category, minPrice, maxPrice]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
      <div style={{ display: 'grid', gap: 8, marginBottom: 12 }}>
        <SearchBar value={search} onChange={setSearch} />
        <FilterPanel
          category={category}
          setCategory={setCategory}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />
      </div>

      <p className="small-muted">Tổng sản phẩm: <strong>{filtered.length}</strong> — Trang <strong>{currentPage}</strong> / {totalPages}</p>

      <div className="product-grid">
        {pageItems.map(p => (
          <ProductCard key={p.id} product={p} onDelete={id => dispatch({ type: 'delete', payload: id })} />
        ))}
      </div>

      <Pagination current={currentPage} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};
