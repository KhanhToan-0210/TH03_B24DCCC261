// src/pages/AddProductPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductForm } from '../components/ProductForm';
import { useProducts } from '../context/ProductContext';

export const AddProductPage: React.FC = () => {
  const { dispatch } = useProducts();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Thêm sản phẩm</h2>
      <div className="container">
        <ProductForm onSubmit={(data) => {
          dispatch({ type: 'add', payload: data });
          navigate('/');
        }} />
      </div>
    </div>
  );
};
