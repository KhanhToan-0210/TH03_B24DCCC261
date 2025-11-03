// src/components/ProductCard.tsx
import React from 'react';
import { Product } from 'C:\Users\ADMIN\Documents\FirstProjectPython\Th03_B24DCCC261\product-management-app\src\types\products';
import { useNavigate } from 'react-router-dom';

export const ProductCard: React.FC<{ product: Product; onDelete: (id: number) => void }> = ({ product, onDelete }) => {
  const navigate = useNavigate();
  return (
    <div className="card">
      <h3>{product.ten}</h3>
      <p className="small-muted">{product.danhMuc} • {product.gia.toLocaleString()} VNĐ</p>
      <p>Số lượng: {product.soLuong}</p>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button onClick={() => navigate(`/products/${product.id}`)}>Chi tiết</button>
        <button onClick={() => navigate(`/edit/${product.id}`)}>Sửa</button>
        <button onClick={() => { if (confirm(`Xác nhận xóa "${product.ten}"?`)) onDelete(product.id); }}>Xóa</button>
      </div>
    </div>
  );
};
