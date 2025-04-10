"use clinet"

import Image from 'next/image'
import React from 'react'
import CartQuantitySelect from './CartQuantitySelect' 
import { CartRemoveButton } from './CartRemoveButton'
import { AccountItemType } from '@types/allTypes'

const CartItemCard: React.FC<AccountItemType> = ({ cart }) => {
    return (
        <div className="flex gap-4 p-6 w-full border-b">
            <div>
                <Image
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}${cart?.products?.images[0].url}`}
                    alt={cart?.products?.name}
                    width={120}
                    height={150}
                    className='w-full h-auto object-cover'
                />
            </div>
            <div className="flex flex-col justify-around w-full">
                <div>
                    <h3 className="font-semibold mb-[2px]">{cart?.products?.name}</h3>
                    <span className="text-slate-500 font-semibold">${((cart.products.price - ((cart.products.price / 100) * cart.products.discount)) * cart.quantity).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <CartQuantitySelect id={cart.documentId} currentQuantity={cart.quantity}/>

                    <CartRemoveButton id={cart.documentId}/>
                </div>
            </div>
        </div>
    )
}

export default CartItemCard