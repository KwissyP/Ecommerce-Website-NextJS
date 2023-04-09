/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { formatCurrency } from '../utils/format';

export default function ProductItem({ product }) {
    return (
        <div className="card">
            <Link href={`/product/${product.slug}`}>

                <img
                    src={product.image_url}
                    alt={product.name}
                    className="rounded shadow"
                    style={{width:"100%"}}
                />

            </Link>

            <div className="flex flex-col items-center justify-center p-5">
                <Link href={`/product/${product.slug}`} className="text-lg">
                    {product.name}
                </Link>
                <p className="mb-2">{product.brand.name}</p>
                <p>{formatCurrency(product.sale_price)}</p>
                <button className="primary-button" type="button">
                    Add to cart
                </button>
            </div>
        </div>
    );
}
