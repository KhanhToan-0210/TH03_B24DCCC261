// src/components/ProductForm.tsx
import React, { useState } from 'react';
import { Category, Product } from '../types/product';

type Props = {
  initial?: Partial<Product>;
  onSubmit: (data: Omit<Product, 'id'>) => void;
};

export const ProductForm: React.FC<Props> = ({ initial = {}, onSubmit }) => {
  const [ten, setTen] = useState(initial.ten ?? '');
  const [danhMuc, setDanhMuc] = useState<Category | ''>((initial.danhMuc as Category) ?? '');
  const [gia, setGia] = useState(initial.gia ? String(initial.gia) : '');
  const [soLuong, setSoLuong] = useState(initial.soLuong ? String(initial.soLuong) : '');
  const [moTa, setMoTa] = useState(initial.moTa ?? '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!ten.trim()) e.ten = 'Tên sản phẩm bắt buộc.';
    else if (ten.trim().length < 3) e.ten = 'Tên sản phẩm tối thiểu 3 ký tự.';
    if (gia === '') e.gia = 'Giá bắt buộc.';
    else {
      const g = Number(gia);
      if (Number.isNaN(g) || g <= 0) e.gia = 'Giá phải là số dương.';
    }
    if (soLuong === '') e.soLuong = 'Số lượng bắt buộc.';
    else {
      const s = Number(soLuong);
      if (!Number.isInteger(s) || s < 0) e.soLuong = 'Số lượng phải là số nguyên không âm.';
    }
    if (!danhMuc) e.danhMuc = 'Vui lòng chọn danh mục.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev?: React.FormEvent) => {
    ev?.preventDefault();
    if (!validate()) return;
    onSubmit({
      ten: ten.trim(),
      danhMuc: danhMuc as Category,
      gia: Number(gia),
      soLuong: Number(soLuong),
      moTa: moTa.trim()
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 10 }}>
      <div>
        <label>Tên sản phẩm</label>
        <input value={ten} onChange={e => setTen(e.target.value)} />
        {errors.ten && <div className="error">{errors.ten}</div>}
      </div>

      <div>
        <label>Danh mục</label>
        <select value={danhMuc} onChange={e => setDanhMuc(e.target.value as Category)}>
          <option value="">-- Chọn --</option>
          <option value="Điện tử">Điện tử</option>
          <option value="Quần áo">Quần áo</option>
          <option value="Đồ ăn">Đồ ăn</option>
          <option value="Sách">Sách</option>
          <option value="Khác">Khác</option>
        </select>
        {errors.danhMuc && <div className="error">{errors.danhMuc}</div>}
      </div>

      <div>
        <label>Giá (VNĐ)</label>
        <input value={gia} onChange={e => setGia(e.target.value)} />
        {errors.gia && <div className="error">{errors.gia}</div>}
      </div>

      <div>
        <label>Số lượng</label>
        <input value={soLuong} onChange={e => setSoLuong(e.target.value)} />
        {errors.soLuong && <div className="error">{errors.soLuong}</div>}
      </div>

      <div>
        <label>Mô tả</label>
        <textarea value={moTa} onChange={e => setMoTa(e.target.value)} />
      </div>

      <div>
        <button type="submit">Lưu</button>
      </div>
    </form>
  );
};
