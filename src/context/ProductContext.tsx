// src/context/ProductContext.tsx
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Product } from '../types/product';
import { initialProducts } from '../data/initialProducts';
import { loadFromLocalStorage, saveToLocalStorage } from '../hooks/useLocalStorage';

type State = { products: Product[]; nextId: number; };
type Action =
  | { type: 'initialize'; payload: Product[] }
  | { type: 'add'; payload: Omit<Product, 'id'> }
  | { type: 'update'; payload: Product }
  | { type: 'delete'; payload: number };

const ProductContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'initialize': {
      const maxId = action.payload.reduce((m, p) => Math.max(m, p.id), 0);
      return { products: action.payload, nextId: maxId + 1 };
    }
    case 'add': {
      const newProduct: Product = { id: state.nextId, ...action.payload };
      return { products: [newProduct, ...state.products], nextId: state.nextId + 1 };
    }
    case 'update': {
      return { ...state, products: state.products.map(p => p.id === action.payload.id ? action.payload : p) };
    }
    case 'delete': {
      return { ...state, products: state.products.filter(p => p.id !== action.payload) };
    }
    default:
      return state;
  }
}

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { products: [], nextId: 1 });

  // init from localStorage or seed
  useEffect(() => {
    const stored = loadFromLocalStorage<Product[]>('products_v1');
    if (stored && stored.length) dispatch({ type: 'initialize', payload: stored });
    else dispatch({ type: 'initialize', payload: initialProducts });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // persist
  useEffect(() => {
    saveToLocalStorage('products_v1', state.products);
  }, [state.products]);

  return <ProductContext.Provider value={{ state, dispatch }}>{children}</ProductContext.Provider>;
};

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts must be used within ProductProvider');
  return ctx;
}
