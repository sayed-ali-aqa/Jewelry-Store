"use server"
import React from 'react'
import { RefreshCcw, Shield, Truck } from 'lucide-react'

const HomeBanner = () => {
    return (
        <div className='bg-primary flex flex-col md:flex-row flex-wrap items-start md:items-center justify-start lg:justify-center gap-10 px-6 py-8'>
            {/* Free Shipping */}
            <div className="flex items-center gap-6 min-w-[260px]">
                <div className='border-2 border-slate-250 p-2 transform rotate-45'>
                    <div className='border-2 border-slate-250 p-2'>
                        <Truck size={24} className='text-white transform -rotate-45' />
                    </div>
                </div>
                <div className='flex flex-col gap-2 justify-center'>
                    <h3 className='text-white font-medium text-lg uppercase'>Free Shipping Worldwide</h3>
                    <p className='text-slate-200'>Enjoy free shipping on all orders over $200.00.</p>
                </div>
            </div>

            {/* 30-Day Return Policy */}
            <div className="flex items-center gap-6 min-w-[260px]">
                <div className='border-2 border-slate-250 p-2 transform rotate-45'>
                    <div className='border-2 border-slate-250 p-2'>
                        <RefreshCcw size={24} className='text-white transform -rotate-45' />
                    </div>
                </div>
                <div className='flex flex-col gap-2 justify-center'>
                    <h3 className='text-white font-medium text-lg uppercase'>30-Day Easy Returns</h3>
                    <p className='text-slate-200'>Shop with confidence. Hassle-free returns within 30 days.</p>
                </div>
            </div>

            {/* Secure Payments */}
            <div className="flex items-center gap-6 min-w-[260px]">
                <div className='border-2 border-slate-250 p-2 transform rotate-45'>
                    <div className='border-2 border-slate-250 p-2'>
                        <Shield size={24} className='text-white transform -rotate-45' />
                    </div>
                </div>
                <div className='flex flex-col gap-2 justify-center'>
                    <h3 className='text-white font-medium text-lg uppercase'>100% Secure Payment</h3>
                    <p className='text-slate-200'>Your payments are safe and encrypted for complete security.</p>
                </div>
            </div>
        </div>

    )
}

export default HomeBanner