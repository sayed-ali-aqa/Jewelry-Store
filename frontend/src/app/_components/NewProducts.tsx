import React from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@types/allTypes';

const getNewProducts = async () => {
    // revalidate every 6 hours
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/products/new`, { next: { revalidate: 60 * 60 * 6 } });
    return res.json();
};

const NewProducts = async () => {
    const products = await getNewProducts();

    return (
        <section className='flex flex-col items-center px-4 mx-auto pt-3 pb-12 gap-8 max-w-[1800px]'>
            <h2 className='text-4xl font-semibold text-center'>New Products</h2>

            <div className='flex justify-center gap-6 flex-wrap'>
                {products.length > 0 ? (
                    products.map((product: Product) => (
                        <ProductCard
                            key={product.documentId}
                            product={product}
                            className='max-w-[280px]'
                        />
                    ))
                ) : (
                    <p className="text-gray-500">No products available</p>
                )}
            </div>
        </section>
    );
};

export default NewProducts;