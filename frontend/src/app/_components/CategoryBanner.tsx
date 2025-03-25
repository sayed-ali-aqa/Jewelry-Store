import React from 'react'
import Link from 'next/link'
import { MoveRight } from 'lucide-react'
import { getProductsCategories } from '../../lib/api';

const CategoryBanner = async () => {
    const productCategories = await getProductsCategories();

    return (
        <div className='px-4 py-14 max-w-[1600px] mx-auto'>
            <h2 className='mb-8 text-4xl font-semibold'>Shop by Category</h2>

            <div className='grid gap-4 sm:gap-6 grid-cols-12 justify-between'>
                {productCategories.data.map((item: any, index: number) => (
                    <div
                        key={index}
                        className="col-span-12 sm:col-span-6 lg:col-span-3 h-[300px] w-full bg-cover bg-center relative"
                        style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_URL}${item.image.url})` }}
                    >
                        <Link href={`/products?category=${item.category}`} className='absolute inset bg-black/2 backdrop-blur-[3px] top-0 bottom-0 w-full p-8 flex flex-col justify-center gap-4 group'>
                            <h3 className='text-3xl font-semibold uppercase'>{item.category}</h3>
                            <span className='flex items-center gap-2 text-lg transition-all duration-300 group-hover:text-primary'>Shop Now <MoveRight size={16} /></span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryBanner;
