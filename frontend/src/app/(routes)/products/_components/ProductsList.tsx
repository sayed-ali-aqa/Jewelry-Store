"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import ProductCard from '@/components/ProductCard';
import { Product } from '@types/allTypes';
import ProductsFilter from './ProductsFilter';
import { useSearchParams } from 'next/navigation';

const ProductsList = ({ initialProducts }: { initialProducts: Product[] }) => {
    const searchParams = useSearchParams(); 
    const [products, setProducts] = useState(initialProducts);

    const fetchFilteredProducts = useMemo(() =>
        debounce(async (query: string) => {
            if (!query.trim()) return;
            const res = await fetch(`/api/products?search=${query}`);
            const data = await res.json();
            setProducts(data.data);
        }, 500),
        []);

    useEffect(() => {
        const search = searchParams.get('search') || '';

        if (search.trim()) {
            fetchFilteredProducts(search);
        } else {
            setProducts(initialProducts);
        }

        return () => {
            fetchFilteredProducts.cancel();
        };
    }, [searchParams.get('search'), fetchFilteredProducts]);

    return (
        <section className='flex gap-10'>
            <ProductsFilter />

            <div className='w-full flex gap-6 flex-wrap'>
                {products.length > 0 ? (
                    products.map((product: Product) => (
                        <ProductCard key={product.id} product={product} className='max-w-[300px]' />
                    ))
                ) : (
                    <p className="text-gray-500">No products available</p>
                )}
            </div>
        </section>
    );
};

export default ProductsList;
