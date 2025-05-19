import { useState } from 'react';

export const useProductStore = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  return { products, setProducts, fetchProducts };
};