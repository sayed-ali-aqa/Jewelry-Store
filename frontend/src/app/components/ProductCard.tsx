
import React from 'react'
import WishlistIconButton from '@/components/WishlistIconButton'
import Link from 'next/link'
import ProductLabel from './ProductLabel'
import { ProductCardProps } from '@types/allTypes'
import Image from 'next/image'

const ProductCard: React.FC<ProductCardProps> = ({ className, product }) => {
    return (
        <Link href={`/products/${product.slug}`} className={`relative w-full min-w-[250px] h-auto group ${className}`}>
            <div className='flex justify-between absolute top-4 w-full items-center'>
                <ProductLabel label={product.label} />

                <WishlistIconButton id={product.id} />
            </div>

            <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.images[0].url}`}
                alt={product.alt}
                width={300}
                height={300}
                className='w-full h-auto object-cover'
            />

            <div className='bg-white absolute bottom-3 left-3 right-3 p-4 flex flex-col gap-1'>
                <h3 className='transition-all duration-300 group-hover:text-primary'>{product.name}</h3>

                <div className='flex gap-2'>
                    <span className='line-through text-slate-400 font-semibold'>${(product.price).toFixed(2)}</span>
                    <span className='text-primary font-bold'>${(product.price - (product.price / 100) * product.discount).toFixed(2)}</span>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard