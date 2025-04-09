
import React from 'react'
import WishlistIconButton from '@/components/WishlistIconButton'
import Link from 'next/link'
import { WishlistCardProps } from '@types/allTypes'
import Image from 'next/image'
import ProductLabel from '@/components/ProductLabel'
import WishlistRemoveButton from './WishlistRemoveButton'

const WishlistCard: React.FC<WishlistCardProps> = ({ className, wishlist }) => {
    return (
        <Link href={`/products/${wishlist?.products?.slug}`} className={`relative w-full min-w-[200px] h-auto group ${className}`}>
            <div className='flex justify-between absolute top-4 w-full items-center'>
                <ProductLabel label={wishlist?.products?.label} />

                <WishlistRemoveButton id={wishlist.id} />
            </div>

            <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}${wishlist?.products?.images[0]?.url}`}
                alt={wishlist?.products?.alt}
                width={300}
                height={300}
                className='w-full h-auto object-cover'
            />

            <div className='bg-white absolute bottom-3 left-3 right-3 p-4 flex flex-col gap-1'>
                <h3 className='transition-all duration-300 group-hover:text-primary'>{wishlist?.products?.name}</h3>

                <div className='flex gap-2'>
                    <span className='line-through text-slate-400 font-semibold'>${(wishlist?.products?.price).toFixed(2)}</span>
                    <span className='text-primary font-bold'>${(wishlist?.products?.price - (wishlist?.products?.price / 100) * wishlist?.products?.discount).toFixed(2)}</span>
                </div>
            </div>
        </Link>
    )
}

export default WishlistCard