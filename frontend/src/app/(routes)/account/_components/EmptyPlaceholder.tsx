import { EmptyPlaceholderProps } from '@types/allTypes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const EmptyPlaceholder: React.FC<EmptyPlaceholderProps> = ({ image, text, actionText, clasName = "", imageSize = 200, isAction = true }) => {
    return (
        <div className={`h-[80vh] flex flex-col justify-center text-center ${clasName}`}>
            <Image
                alt='Image'
                src={image}
                width={imageSize}
                height={imageSize}
                className='mx-auto'
            />

            <p className='mt-6 text-slate-500'>{text}</p>
            {
                isAction && (
                    <Link href="/products" className='w-fit bg-black text-primary-foreground shadow hover:bg-black/90 px-4 py-3 mt-4 mx-auto'>{actionText}</Link>
                )
            }
        </div>
    )
}

export default EmptyPlaceholder