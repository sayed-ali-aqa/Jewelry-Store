
import React from 'react'
import Link from 'next/link'
import { CartCardProps } from '@types/allTypes'
import Image from 'next/image'
import ProductLabel from '@/components/ProductLabel'
import CartRemoveButton from './CartRemoveButton'

const ShoppingCartCard: React.FC<CartCardProps> = ({ className, cart }) => {
    return (
        <Link href={`/products/${cart?.products?.slug}`} className={`relative w-full min-w-[200px] h-auto group ${className}`}>
            <div className='flex justify-between absolute top-4 w-full items-center'>
                <ProductLabel label={cart?.products?.label} />

                <CartRemoveButton id={cart.documentId} />
            </div>

            <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}${cart?.products?.images[0]?.url}`}
                alt={cart?.products?.alt}
                width={300}
                height={300}
                className='w-full h-auto object-cover'
            />

            <div className='bg-white absolute bottom-3 left-3 right-3 p-4 flex flex-col gap-1'>
                <h3 className='transition-all duration-300 group-hover:text-primary'>{cart?.products?.name}</h3>

                <div className='flex gap-2'>
                    <span className='line-through text-slate-400 font-semibold'>${(cart?.products?.price).toFixed(2)}</span>
                    <span className='text-primary font-bold'>${(cart?.products?.price - (cart?.products?.price / 100) * cart?.products?.discount).toFixed(2)}</span>
                </div>
            </div>
        </Link>
    )
}

export default ShoppingCartCard