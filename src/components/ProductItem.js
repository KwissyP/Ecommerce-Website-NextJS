/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { formatCurrency } from '../utils/format';

export default function ProductItem({ product }) {
    return (
        <div className="card">
            <Link href={`/product/${product.id}`}>

                <img
                    src={product.image_url}
                    alt={product.name}
                    className="rounded shadow object-contain h-64 w-full"
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
        </div>
    );
}
