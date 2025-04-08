"use client";

import { Button } from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { addToWishlist } from '../../../../lib/api'

const AddToCartButton = ({ id }: { id: number }) => {
    const handleAddToWishlist = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        const response = await addToWishlist(id);

        if (response && response?.data?.id) {
            toast.success("Added to wishlist successfully");
        }
    };

    return (
        <Button
            onClick={handleAddToWishlist}
            size="lg"
            className='text-lg px-5 py-6'
        ><ShoppingBag /> Add to Cart</Button>
    )
}

export default AddToCartButton