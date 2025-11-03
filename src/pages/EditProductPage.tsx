// src/pages/EditProductPage.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductForm } from '../components/ProductForm';
import { useProducts } from '../context/ProductContext';

export const EditProductPage: React.FC = () => {
  const { id } = useParams();
  const pid = Number(id);
  const { state, dispatch } = useProducts();
  const navigate = useNavigate();
  const product = state.products.find(p => p.id === pid);
  if (!product) return <div>Không tìm thấy sản phẩm</div>;

  return (
    <div>
      <h2>Chỉnh sửa sản phẩm</h2>
      <div className="container">
        <ProductForm initial={product} onSubmit={(data) => {
          dispatch({ type: 'update', payload: { id: product.id, ...data } });
          navigate(`/products/${product.id}`);
        }} />
      </div>
    </div>
  );
};
