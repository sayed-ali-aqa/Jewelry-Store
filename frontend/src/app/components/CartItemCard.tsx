"use clinet"

import Image from 'next/image'
import React from 'react'
import CartQuantitySelect from './CartQuantitySelect'
import { CartRemoveButton } from './CartRemoveButton'
import { CartItemCardProps } from '@types/allTypes'
import Link from 'next/link'

const CartItemCard: React.FC<CartItemCardProps> = ({ cart }) => {
    return (
        <div className="flex gap-4 pb-8 md:px-6 w-full border-b">
            <div>
                <Image
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}${cart?.products?.images[0].url}`}
                    alt={cart?.products?.name}
                    width={108}
                    height={135}
                    className='w-full h-auto object-cover'
                />
            </div>
            <div className="flex justify-between items-center w-full">
                <div className='flex flex-col py-1 h-full'>
                    <Link href={`/products/${cart?.products?.slug}`} className="font-semibold mb-[2px] transition-all duration-300 hover:text-primary">{cart?.products?.name}</Link>

                    <div className='flex gap-2'>
                        <span className='line-through text-slate-400 font-semibold'>${(cart.products.price).toFixed(2)}</span>
                        <span className="text-slate-500 font-semibold">${((cart.products.price - ((cart.products.price / 100) * cart.products.discount)) * cart.quantity).toFixed(2)}</span>
                    </div>

                    <div className='mt-auto'>
                        <CartQuantitySelect id={cart.documentId} currentQuantity={cart.quantity} />
                    </div>
                </div>
                <div className="flex justify-between">
                    <CartRemoveButton id={cart.documentId} />
                </div>
            </div>
        </div>
    )
}

export default CartItemCard