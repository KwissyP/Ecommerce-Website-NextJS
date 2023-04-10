/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react'
import { Store } from "../utils/Store"
import Layout from '@/components/Layout';
import Link from 'next/link';
import { XCircleIcon } from '@heroicons/react/outline'
import { formatCurrency } from '../utils/format';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

function CartScreen() {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    const removeItemHandler = (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    };

    const subtotal = cartItems.reduce((a, c) => a + c.quantity * c.sale_price, 0);

    const updateCartHandler = (item, qty) => {
        const quantity = Number(qty);
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    }

    return (
        <Layout title="Shopping Cart">
            <h1 className="mb-4 text-xl">Shopping Cart</h1>
            {
                cartItems.length === 0 ?
                    (<div>
                        Cart is empty. <Link href="/">Go shopping</Link>
                    </div>) :
                    (
                        <div className="grid md:grid-cols-4 md:gap-5">
                            <div className="overflow-x-auto md:col-span-3">
                                <table className="min-w-full">
                                    <thead className="border-b">
                                        <tr>
                                            <th className="px-5 text-left">Item</th>
                                            <th className="p-5 text-right">Quantity</th>
                                            <th className="p-5 text-right">Price</th>
                                            <th className="p-5">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr key={item.id} className='border-b'>
                                                <td>
                                                    <Link href={`/product/${item.id}`} className='flex items-center'>
                                                        <img src={item.image_url} alt={item.name}
                                                            className='w-10 h-10' />
                                                        &nbsp;
                                                        {item.name}
                                                    </Link>
                                                </td>
                                                <td className="p-5 text-right">
                                                    <select value={item.quantity} onChange={(e) => updateCartHandler(item, e.target.value)}>
                                                        {[...Array(Math.round(item.list_price)).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </select>

                                                </td>
                                                <td className="p-5 text-right">{item.sale_price}</td>
                                                <td className="p-5 text-center">
                                                    <button onClick={() => removeItemHandler(item)}>
                                                        <XCircleIcon className='h-5 w-5' />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='card p-5'>
                                <ul>
                                    <li>
                                        <div className="pb-3 text-xl">
                                            Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : &nbsp;
                                            {formatCurrency(subtotal)}
                                        </div>
                                    </li>
                                    <li>
                                        <button className="primary-button w-full" onClick={() => router.push('/shipping')}>
                                            Check Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
            }
        </Layout>
    )
}

export default dynamic(() => Promise.resolve(CartScreen), {ssr:false})