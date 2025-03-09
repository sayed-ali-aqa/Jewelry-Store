import React from 'react'
import ProductCard from '@/components/ProductCard'

const TopProducts = () => {
    return (
        <section className='flex flex-col items-center px-4 mx-auto pt-3 pb-12 gap-8 max-w-[1600px]'>
            <h2 className='text-4xl font-semibold text-center'>Top Products</h2>

            <div className='flex justify-center gap-6 flex-wrap'>
                <ProductCard className='max-w-[400px]' />
                <ProductCard className='max-w-[400px]' />
                <ProductCard className='max-w-[400px]' />
                <ProductCard className='max-w-[400px]' />
                <ProductCard className='max-w-[400px]' />
                <ProductCard className='max-w-[400px]' />
            </div>
        </section>
    )
}

export default TopProducts