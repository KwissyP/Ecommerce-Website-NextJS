/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import  Link  from 'next/link';
import { formatCurrency } from '../../utils/format';
import { Store } from '../../utils/Store';
import Product from '../../../models/Product';
import db from '@/utils/db';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  if (!product) {
    return <Layout title='Product Not Found'>Product not found! Sorry :(</Layout>;
  }

  const addToCardHandler =async() => {
    const existItem = state.cart.cartItems.find((x) => x.id === product.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`)

    if (Math.round(data.list_price) < quantity) {
      return toast.error(`Sorry, the product (${data.name}) is out of stock`);
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity }});
    router.push('/cart');
  };

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">Back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className='md:col-span-2'>
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full"
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className='text-lg font-extrabold'>{product.name}</h1>
            </li>
            <li>
              Category: {product.category}
            </li>
            <li>
              Brand: <span className='font-bold'>{product.brand}</span>
            </li>
            <li>
              {product.average_product_rating} of {product.num_reviews} reviews
            </li>
            <li>
              Description: {product.description}
            </li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className='mb-2 flex justify-between'>
              <div>Price</div>
              <div>{formatCurrency(product.sale_price)}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.list_price > 0 ? 'In stock' : 'Unavailable'}</div>
            </div>
            <button className="primary-button w-full" onClick={addToCardHandler}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  if(isNaN(id)){
    return {
      props: {
        product: null
      }
    }
  }

  await db.connect();
  const product = await Product.findOne({ id }).lean();
  await db.disconnect();

  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    }
  }
}

// export async function getStaticProps() {
//   const { data } = await axios.get(
//     'https://example-data.draftbit.com/products?_limit=20'
//   );
//   return {
//     props: {
//       products: data,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const { data } = await axios.get(
//     'https://example-data.draftbit.com/products?_limit=20'
//   );
//   const paths = data.map((product) => ({
//     params: { id: product.id.toString() },
//   }));
//   return { paths, fallback: false };
// }
