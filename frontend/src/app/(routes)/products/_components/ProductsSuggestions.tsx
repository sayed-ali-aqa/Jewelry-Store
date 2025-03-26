import React from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@types/allTypes';
import axios from 'axios';

const getSuggestedProductsByCategory = async (id: string, category: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/products/suggestions`, {
        params: { id, category },
    });

    return response.data;  
};

const ProductsSuggestions = async ({ id, category }: { id: string, category: string }) => {
    const products = await getSuggestedProductsByCategory(id, category);

    return (
        <section className='flex flex-col items-center px-4 mx-auto pt-3 pb-12 gap-8 max-w-[1800px]'>
            <div className='flex justify-center gap-6 flex-wrap'>
                {products.length > 0 ? (
                    products.map((product: Product) => (
                        <ProductCard key={product.id} product={product} className='max-w-[280px]' />
                    ))
                ) : (
                    <p className="text-gray-500">No product suggestions</p>
                )}
            </div>
        </section>
    );
};

export default ProductsSuggestions
