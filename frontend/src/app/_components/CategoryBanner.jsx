import React from 'react'
import Link from 'next/link'
import { MoveRight } from 'lucide-react'

const CategoryBanner = () => {
    return (
        <div className='px-4 py-14 max-w-[1600px] mx-auto'>
            <h2 className='mb-8 text-4xl font-semibold'>Shop by Category</h2>

            <div className='grid gap-4 sm:gap-6 grid-cols-12 justify-between'>
                <div className='col-span-12 sm:col-span-6 lg:col-span-3 h-[300px] w-full bg-[url("/images/covers/earings.jpg")] bg-cover bg-center relative'>
                    <Link href="/products/earings" className='absolute inset bg-black/2 backdrop-blur-[3px] top-0 bottom-0 w-full p-8 flex flex-col justify-center gap-4 group'>
                        <h3 className='text-3xl font-semibold uppercase'>Earings</h3>
                        <span className='flex items-center gap-2 text-lg transition-all duration-300 group-hover:text-primary'>Shop Now <MoveRight size={16} /></span>
                    </Link>
                </div>

                <div className='col-span-12 sm:col-span-6 lg:col-span-3 h-[300px] w-full bg-[url("/images/covers/bracelets.png")] bg-cover bg-center relative'>
                    <Link href="/products/earings" className='absolute inset bg-black/2 backdrop-blur-[3px] top-0 bottom-0 w-full p-8 flex flex-col justify-center gap-4 group'>
                        <h3 className='text-3xl font-semibold uppercase'>Bracelets</h3>
                        <span className='flex items-center gap-2 text-lg transition-all duration-300 group-hover:text-primary'>Shop Now <MoveRight size={16} /></span>
                    </Link>
                </div>

                <div className='col-span-12 sm:col-span-6 lg:col-span-3 h-[300px] w-full bg-[url("/images/covers/rings.jpg")] bg-cover bg-center relative'>
                    <Link href="/products/earings" className='absolute inset bg-black/2 backdrop-blur-[3px] top-0 bottom-0 w-full p-8 flex flex-col justify-center gap-4 group'>
                        <h3 className='text-3xl font-semibold uppercase'>Rings</h3>
                        <span className='flex items-center gap-2 text-lg transition-all duration-300 group-hover:text-primary'>Shop Now <MoveRight size={16} /></span>
                    </Link>
                </div>

                <div className='col-span-12 sm:col-span-6 lg:col-span-3 h-[300px] w-full bg-[url("/images/covers/necklaces.jpg")] bg-cover bg-center relative'>
                    <Link href="/products/earings" className='absolute inset bg-black/2 backdrop-blur-[3px] top-0 bottom-0 w-full p-8 flex flex-col justify-center gap-4 group'>
                        <h3 className='text-3xl font-semibold uppercase'>Necklaces</h3>
                        <span className='flex items-center gap-2 text-lg transition-all duration-300 group-hover:text-primary'>Shop Now <MoveRight size={16} /></span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CategoryBanner