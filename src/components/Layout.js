import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Store } from '../utils/Store'

export default function Layout({ title, children }) {
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const [cartItemsCount, setcartItemsCount] = useState(0);
    useEffect(() => {
        setcartItemsCount(cart.cartItems.reduce((a,c) => a + c.quantity, 0))
    },[cart.cartItems]);

    return (
        <>
            <Head>
                <title>{title ? title + ' - Azeus' : 'Azeus'}</title>
                <meta name="description" content="E-commerce Website" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/asos.png" />
            </Head>
            <div className='flex min-h-screen flex-col justify-between'>
                <header>
                    <nav className='flex h-12 items-center px-4 justify-between shadow-md'>
                        <Link href="/" className='text-lg font-bold'>
                            Azeus
                        </Link>
                        <div>
                            <Link href="/cart" className='p-2'>Cart {cartItemsCount > 0 && ( <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>{cartItemsCount}</span>)}</Link>
                            <Link href="/login" className='p-2'>Login</Link>
                        </div>
                    </nav>
                </header>

                <main className='container m-auto mt-4 px-4'>
                    {children}
                </main>

                <footer className='flex h-10 justify-center items-center shadow-inner'>
                    <p>Copyright &copy; 2023 Azeus</p>
                </footer>
            </div>
        </>
    )
}
