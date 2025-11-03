// src/pages/ProductDetailPage.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const pid = Number(id);
  const { state, dispatch } = useProducts();
  const navigate = useNavigate();
  const product = state.products.find(p => p.id === pid);
  if (!product) return <div className="container">Không tìm thấy sản phẩm</div>;

  return (
    <div className="container">
      <h2>{product.ten}</h2>
      <p className="small-muted">Danh mục: {product.danhMuc}</p>
      <p>Giá: {product.gia.toLocaleString()} VNĐ</p>
      <p>Số lượng: {product.soLuong}</p>
      <p>Mô tả: {product.moTa}</p>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button onClick={() => navigate(`/edit/${product.id}`)}>Sửa</button>
        <button onClick={() => { if (confirm('Xác nhận xóa?')) { dispatch({ type: 'delete', payload: product.id }); navigate('/'); } }}>Xóa</button>
      </div>
    </div>
  );
};
