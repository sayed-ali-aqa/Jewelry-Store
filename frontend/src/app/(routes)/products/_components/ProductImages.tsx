"use client"
import ProductLabel from '@/components/ProductLabel'
import { ProductImagesProps } from '@types/allTypes'
import React, { useState } from 'react'

const ProductImages: React.FC<ProductImagesProps> = ({ images, alt, labelText }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)

    return (
        <div className='w-1/2 flex gap-5'>
            <div className='flex flex-col gap-3'>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={`/images/products/${image}`}
                        alt={`${alt} - image ${index + 1}`}
                        className={`w-20 h-20 object-contain object-center ${selectedImageIndex === index ? 'border-2 border-primary' : ''}`}
                        onClick={() => setSelectedImageIndex(index)}
                    />
                ))}
            </div>

            <div className='relative'>
                <img
                    src={`/images/products/${images[selectedImageIndex]}`}
                    alt={alt}
                    className='w-auto h-auto object-cover object-center'
                />

                <ProductLabel label={`${labelText}`} className="absolute right-0" />
            </div>
        </div>
    )
}

export default ProductImages