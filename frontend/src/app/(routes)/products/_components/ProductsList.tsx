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

    // Define debounced search function
    const fetchFilteredProducts = useMemo(
        () =>
            debounce(async (query: string, categories: string[]) => {
                // Prepare the category filter part by mapping each category and joining them with '&'
                const categoryQuery = categories
                    .map((c) => `filters[category][category][$eq]=${encodeURIComponent(c)}`)
                    .join("&");

                const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?sort=createdAt:desc&pagination[limit]=8&populate=images&populate=category&search=${query}&${categoryQuery}`;

                const res = await fetch(url);
                const data = await res.json();
                setProducts(data.data);
            }, 500),
        []
    );

    useEffect(() => {
        const search = searchParams.get("search") || "";
        const categories = searchParams.getAll("category");

        if (search.trim() || categories.length > 0) {
            fetchFilteredProducts(search, categories);
        } else {
            setProducts(initialProducts);
        }

        return () => {
            fetchFilteredProducts.cancel();
        };
    }, [searchParams]);

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
