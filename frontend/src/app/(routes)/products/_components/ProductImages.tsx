"use client"
import ProductLabel from '@/components/ProductLabel'
import { ProductImagesProps } from '@types/allTypes'
import React, { useState } from 'react'

const ProductImages: React.FC<ProductImagesProps> = ({ images, alt, labelText }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)

    return (
        <div className='w-full md:w-1/2 flex gap-5 flex-col-reverse xs:flex-row'>
            <div className='w-20 min-w-20 flex flex-row xs:flex-col gap-3 ms:mx-auto'>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={`${process.env.NEXT_PUBLIC_SERVER_URL}${image?.url}`}
                        alt={`${alt} - image ${index + 1}`}
                        className={`w-20 h-20 object-contain object-center bg-slate-50 ${selectedImageIndex === index ? 'border-2 border-primary' : ''}`}
                        onClick={() => setSelectedImageIndex(index)}
                    />
                ))}
            </div>

            <div className='relative mx-auto'>
                <img
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}${images[selectedImageIndex]?.url}`}
                    alt={alt}
                    className='w-auto h-auto object-cover object-center'
                />

                <ProductLabel label={`${labelText}`} className="absolute right-0" />
            </div>
        </div>
    )
}

export default ProductImages