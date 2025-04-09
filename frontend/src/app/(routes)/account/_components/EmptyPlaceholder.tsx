import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface EmptyPlaceholderProps {
    image: string,
    text: string,
    actionText: string
}

const EmptyPlaceholder: React.FC<EmptyPlaceholderProps> = ({ image, text, actionText }) => {
    return (
        <div className='h-[80vh] flex flex-col justify-center text-center'>
            <Image
                alt='Image'
                src={image}
                width={200}
                height={200}
                className='mx-auto'
            />

            <p className='mt-6 text-slate-500'>{text}</p>
            <Link href="/products" className='w-fit bg-black text-primary-foreground shadow hover:bg-black/90 px-4 py-3 mt-4 mx-auto'>{actionText}</Link>
        </div>
    )
}

export default EmptyPlaceholder