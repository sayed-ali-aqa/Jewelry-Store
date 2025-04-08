"use client";

import { Button } from '@/components/ui/button'
import { Check, Heart } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { addToWishlist } from '../../../../lib/api'
import { useDispatch } from 'react-redux';
import { setWishlistStatus } from '../../../../store/slices/wishlistStatusSlice';
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/store';


const AddToWishlistButton = ({ id }: { id: number }) => {
    const [isAddedToWishlist, setIsAddedToWishlist] = useState<boolean>(false)
    const wishlistStatus = useSelector((state: RootState) => state.wishlistStatus.wishlistStatus);
    const dispatch = useDispatch();

    const handleAddToWishlist = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        const response = await addToWishlist(id);

        if (response && response?.data?.id) {
            dispatch(setWishlistStatus(!wishlistStatus)); // Update Redux state
            toast.success("Added to wishlist successfully");
            setIsAddedToWishlist(true)
        }
    };

    return (
        <Button
            disabled={isAddedToWishlist}
            onClick={handleAddToWishlist}
            size="lg"
            variant="outline"
            className='text-lg px-5 py-6'
        >
            {
                isAddedToWishlist ? (
                    <Check />
                ) : (
                    <Heart />
                )
            }
            Add to Wishlist </Button>
    )
}

export default AddToWishlistButton