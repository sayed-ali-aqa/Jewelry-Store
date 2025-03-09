"use client"
import React from 'react'
import { Heart } from 'lucide-react'

const WishlistIconButton = () => {
    const handleAddToWishlist = (e: any) => {
        e.stopPropagation()
        e.preventDefault()
        alert("Hi")
    }
    
    return (
        <span
            role='button'
            onClick={(e) => handleAddToWishlist(e)}
            className='bg-white p-2 text-primary mr-4 rounded-full transition-all duration-300 hover:bg-primary hover:text-white'>
            <Heart size={18} />
        </span>
    )
}

export default WishlistIconButton