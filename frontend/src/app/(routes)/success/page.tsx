'use client'

import { Check } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

export default function SuccessPage() {
    const searchParams = useSearchParams()
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
        notFound()
    }

    return (
        <div className="p-8 text-center flex flex-col pt-12 items-center h-[90vh]">
            <div className='bg-green-600 p-2 w-fit rounded-full mb-12'>
                <Check className='text-white' size={48} />
            </div>

            <h1 className="text-4xl font-bold mb-3">Payment Success</h1>
            <p className='text-lg text-slate-500'>Your order has been placed successfully</p>

            <Link href="/products" className='w-fit bg-black text-primary-foreground shadow hover:bg-black/90 px-6 py-3 mt-10 mx-auto'>Continue Shopping</Link>
        </div>
    )
}
