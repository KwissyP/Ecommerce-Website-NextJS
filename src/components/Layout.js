import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ title, children }) {
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
                            <Link href="/cart" className='p-2'>Cart</Link>
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
