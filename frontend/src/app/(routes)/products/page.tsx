import BreadCrumb from '@/components/BreadCrumb'
import { Button } from '@/components/ui/button'
import { Heart, ShoppingBag, Star, StarHalf } from 'lucide-react'
import React from 'react'
import ProductImages from './_components/ProductImages'

const page = () => {
    return (
        <div className='p-4 w-full max-w-6xl mx-auto'>
            <BreadCrumb
                current="King Ring X2 Pro"
                visitedLinks={[{ title: "Home", link: "/" }, { title: "Products", link: "/products" }]}
            />

            <div className='flex gap-12 mt-8'>
                <ProductImages images={["01.jpg", "02.jpg", "03.jpg", "04.jpg"]} alt='King Ring X2 Pro' labelText="New" />

                <div className='w-1/2'>
                    <div className='w-full flex items-center justify-between gap-4'>
                        <span className='text-slate-500'>Rings</span>

                        <div className="flex gap-1 text-golden">
                            <Star size={20} />
                            <Star size={20} />
                            <Star size={20} />
                            <Star size={20} />
                            <StarHalf size={20} />
                        </div>
                    </div>

                    <div className='mt-4'>
                        <h1 className='font-semibold text-3xl'>King Ring X2 Pro</h1>

                        <div className='flex gap-2 items-end mt-4'>
                            <span className='text-slate-500 text-2xl font-semibold'>${(320.33).toFixed(2)}</span>
                            <span className='text-slate-500'>(In Stock)</span>
                        </div>
                    </div>

                    <div className='mt-6'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex justify-between gap-3'>
                                <div className='w-1/2 text-slate-500'>Category: <span className='text-black'>Ring</span></div>
                                <div className='w-1/2 text-slate-500'>Quantity: <span className='text-black'>14</span></div>
                            </div>

                            <div className='flex justify-between gap-3'>
                                <div className='w-1/2 text-slate-500'>Primary Material: <span className='text-black'>Silder, Diamond</span></div>
                                <div className='w-1/2 text-slate-500'>Secondary Material: <span className='text-black'>Besmet</span></div>
                            </div>

                            <div className='flex justify-between gap-3'>
                                <div className='w-1/2 text-slate-500'>Total Weight: <span className='text-black'>9gs</span></div>
                                <div className='w-1/2 text-slate-500'>Style: <span className='text-black'>Classic</span></div>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center gap-4 mt-10'>
                        <Button size="lg" className='text-lg px-5 py-6'><ShoppingBag /> Add to Cart</Button>
                        <Button variant="outline" size="lg" className='text-lg px-5 py-6'><Heart /> Add to Wishlist</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page