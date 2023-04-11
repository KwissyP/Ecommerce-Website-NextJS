import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../../models/Product';
import db from '@/utils/db';
import { useContext } from 'react';
import { Store } from '@/utils/Store';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler =async(product) => {
    const existItem = cart.cartItems.find((x) => x.id === product.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`)

    if (Math.round(data.list_price) < quantity) {
      toast.error(`Sorry, the product (${data.name}) is out of stock`)
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity }});
    toast.success('Product added to the cart successfully');
  };

  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} addToCartHandler={addToCartHandler} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props:{
      products: products.map(db.convertDocToObj)
    },
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
