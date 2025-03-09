
import React from 'react'
import WishlistIconButton from '@/components/WishlistIconButton'
import Link from 'next/link'
import ProductLabel from './ProductLabel'

const ProductCard = () => {
    return (
        <Link href='/hello' className='relative w-full max-w-[400px] min-w-[240px] h-auto group'>
            <div className='flex justify-between absolute top-4 w-full items-center'>
                <ProductLabel label='10% off' />

                <WishlistIconButton />
            </div>

            <img
                src="/images/products/01.jpg"
                alt="product -1"
            />

            <div className='bg-white absolute bottom-3 left-3 right-3 p-4 flex flex-col gap-1'>
                <h3 className='transition-all duration-300 group-hover:text-primary'>Queen Brcelets Diamond Seed</h3>

                <div className='flex gap-2'>
                    <span className='line-through text-slate-400 font-semibold'>$1200.00</span>
                    <span className='text-primary font-bold'>$1120.00</span>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard