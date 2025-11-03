// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="nav-links">
        <Link to="/">Trang chủ</Link>
        <Link to="/add">Thêm sản phẩm</Link>
      </div>
    </header>
  );
};
