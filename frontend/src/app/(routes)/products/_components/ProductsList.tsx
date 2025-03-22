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
            debounce(async (query: string, categories: string[], styles: string[]) => {
                let filters: string[] = [];

                // Add category filters
                if (categories.length > 0) {
                    categories.forEach((c) => {
                        filters.push(`filters[$and][0][category][category][$eq]=${encodeURIComponent(c)}`);
                    });
                }

                // Add style filters
                if (styles.length > 0) {
                    styles.forEach((s, index) => {
                        filters.push(`filters[$and][${categories.length + index}][style][style][$eq]=${encodeURIComponent(s)}`);
                    });
                }

                // Construct the final query
                const filterQuery = filters.length > 0 ? `&${filters.join("&")}` : "";

                const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?sort=createdAt:desc&pagination[limit]=8&populate=images&populate=category&search=${query}${filterQuery}`;

                const res = await fetch(url);
                const data = await res.json();
                setProducts(data.data);
            }, 500),
        []
    );

    useEffect(() => {
        const search = searchParams.get("search") || "";
        const categories = searchParams.getAll("category");
        const styles = searchParams.getAll("style");

        if (search.trim() || categories.length > 0 || styles.length > 0) {
            fetchFilteredProducts(search, categories, styles);
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
                {products && products.length > 0 ? (
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
