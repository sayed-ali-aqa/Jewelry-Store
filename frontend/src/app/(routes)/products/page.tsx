import Reviews from '@/components/Reviews'
import React from 'react'
import { getProducts } from '../../../lib/api';
import ProductsList from './_components/ProductsList';
import { ProductsResponse } from '@types/allTypes';

const page = async () => {
    const products: ProductsResponse = await getProducts();

    return (
        <div>
            <Reviews />

            <section className='px-4 py-10'>
                {/* initial fetch of products for better seo */}
                <ProductsList initialProducts={products} />
            </section>
        </div>
    )
}

export default page