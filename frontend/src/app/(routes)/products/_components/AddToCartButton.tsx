"use client";

import { Button } from '@/components/ui/button'
import { Check, ShoppingBag } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { addToCart } from '../../../../lib/api'
import { RootState } from '../../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setCartStatus } from '../../../../store/slices/cartStatusSlice';

const AddToCartButton = ({ id }: { id: string }) => {
    const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false)
    const cartStatus = useSelector((state: RootState) => state.cartStatus.cartStatus);
    const dispatch = useDispatch();

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        // productId and quantity as the arguemtns
        const response = await addToCart(id, 1);

        if (response && response?.data?.id) {
            dispatch(setCartStatus(!cartStatus)); // Update Redux state
            toast.success("Added to cart successfully");
            setIsAddedToCart(true)
        }
    };

    return (
        <Button
            onClick={handleAddToCart}
            size="lg"
            className='text-lg px-5 py-6'
        >
            {
                isAddedToCart ? (
                    <Check />
                ) : (
                    <ShoppingBag />
                )
            }
            Add to Cart</Button>
    )
}

export default AddToCartButton