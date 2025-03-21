import React from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@types/allTypes';

const TopProducts = ({ products }: { products: Product[] }) => {
    return (
        <section className='flex flex-col items-center px-4 mx-auto pt-3 pb-12 gap-8 max-w-[1600px]'>
            <h2 className='text-4xl font-semibold text-center'>New Products</h2>

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

export default TopProducts;
