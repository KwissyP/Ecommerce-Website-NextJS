import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await axios.get(
        'https://example-data.draftbit.com/products?_limit=10'
      );
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </Layout>
  );
}
