"use client";

import { Button } from '@/components/ui/button'
import { Check, Heart, Loader } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { addToWishlist } from '../../../../lib/api'
import { useDispatch } from 'react-redux';
import { setWishlistStatus } from '../../../../store/slices/wishlistStatusSlice';
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/store';

const AddToWishlistButton = ({ id }: { id: string }) => {
    const [isAddedToWishlist, setIsAddedToWishlist] = useState<boolean>(false)
    const wishlistStatus = useSelector((state: RootState) => state.wishlistStatus.wishlistStatus);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleAddToWishlist = async (e: React.MouseEvent) => {
        setIsLoading(true)

        e.stopPropagation();
        e.preventDefault();

        const response = await addToWishlist(id);

        if (response && response?.data?.id) {
            dispatch(setWishlistStatus(!wishlistStatus)); // Update Redux state
            toast.success("Added to wishlist successfully");
            setIsAddedToWishlist(true)
        }

        setIsLoading(false)
    };

    return (
        <Button
            disabled={isAddedToWishlist || isLoading}
            onClick={handleAddToWishlist}
            size="lg"
            variant="outline"
            className='text-lg px-5 py-6 transition-all duration-300 hover:bg-black/90 hover:text-white'
        >
            {
                isAddedToWishlist ? (
                    <Check />
                ) : (
                    isLoading ? <Loader size={18} className="animate-spin" /> : <Heart /> 
                )
            }
            Add to Wishlist </Button>
    )
}

export default AddToWishlistButton