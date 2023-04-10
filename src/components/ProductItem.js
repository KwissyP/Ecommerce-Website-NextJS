/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { formatCurrency } from '../utils/format';

export default function ProductItem({ product }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleStart = () => {
            setIsLoading(true);
        };

        const handleComplete = () => {
            setIsLoading(false);
        };

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    }, [router]);
    return (
        <div className="card">
            <Link href={`/product/${product.id}`}>

                <img
                    src={product.image_url}
                    alt={product.name}
                    className="rounded shadow object-contain h-64 w-full"
                    onClick={() => setIsLoading(true)}
                />

            </Link>

            <div className="flex flex-col items-center justify-center p-5 gap-3">
                <Link href={`/product/${product.id}`} className="text-lg">
                    {product.name}
                </Link>
                <p className="font-bold">{product.brand}</p>
                <p>{formatCurrency(product.sale_price)}</p>
                <button className="primary-button" type="button">
                    Add to cart
                </button>
            </div>
            {isLoading && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-white z-50 flex items-center justify-center">
                    <p className="loader"></p>
                </div>
            )}
        </div>
    );
}
