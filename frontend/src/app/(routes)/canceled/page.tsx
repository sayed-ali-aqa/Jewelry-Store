'use client'

import { X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className="p-8 text-center flex flex-col pt-12 items-center h-[90vh]">
            <div className='bg-red-600 p-2 w-fit rounded-full mb-12'>
                <X className='text-white' size={48} />
            </div>

            <h1 className="text-4xl font-bold mb-3">Payment Canceled</h1>
            <p className='text-lg text-slate-500'>Oops! Your order has been cancelled</p>

            <Link href="/account/shopping-cart" className='w-fit bg-black text-primary-foreground shadow hover:bg-black/90 px-6 py-3 mt-10 mx-auto'>Back To Shopping Cart</Link>
        </div>
    )
}

export default page