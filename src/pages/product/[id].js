import React from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function ProductScreen({ products }) {
  const { query } = useRouter();
  const { id } = query;
  const product = products.find((x) => x.id.toString() === id);
  console.log('product:', product);
  if (!product) {
    return <div>Product not found! Sorry :(</div>;
  }
  return (
    <Layout title={product.name}>
      <h1>{product.name}</h1>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await axios.get(
    'https://example-data.draftbit.com/products?_limit=20'
  );
  return {
    props: {
      products: data,
    },
  };
}

export async function getStaticPaths() {
  const { data } = await axios.get(
    'https://example-data.draftbit.com/products?_limit=20'
  );
  const paths = data.map((product) => ({
    params: { id: product.id.toString() },
  }));
  return { paths, fallback: false };
}
