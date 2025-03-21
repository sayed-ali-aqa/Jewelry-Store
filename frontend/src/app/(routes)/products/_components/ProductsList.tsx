"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import ProductCard from '@/components/ProductCard';
import { Product } from '@types/allTypes';
import ProductsFilter from './ProductsFilter';

const ProductsList = ({ initialProducts }: { initialProducts: Product[] }) => {
    const [products, setProducts] = useState(initialProducts);
    const [search, setSearch] = useState("");

    // Define debounced search function
    const fetchFilteredProducts = useMemo(() =>
        debounce(async (query: string) => {
            if (!query.trim()) return;
            const res = await fetch(`/api/products?search=${query}`);
            const data = await res.json();
            setProducts(data.data);
        }, 500),
        []);

    useEffect(() => {
        if (search.trim()) {
            fetchFilteredProducts(search); // Trigger the debounced function
        } else {
            setProducts(initialProducts);
        }

        return () => {
            // Cancel any pending requests when the component unmounts or the search term changes
            fetchFilteredProducts.cancel();
        };
    }, [search, fetchFilteredProducts]);


    return (
        <section className='flex gap-6'>
            <ProductsFilter search={search} setSearch={setSearch} />

            <div className='flex justify-center gap-6 flex-wrap'>
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
