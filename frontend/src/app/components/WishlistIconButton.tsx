"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import { addToWishlist } from "../../lib/api";
import { toast } from "sonner";
import { WishlistIconButtonProps } from "@types/allTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setWishlistStatus } from "../../store/slices/wishlistStatusSlice";

const WishlistIconButton: React.FC<WishlistIconButtonProps> = ({ id }) => {
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
        <span
            role="button"
            onClick={handleAddToWishlist}
            className={`${isAddedToWishlist ? 'bg-primary text-white' : 'bg-white'} p-2 text-primary mr-4 rounded-full transition-all duration-300 hover:bg-primary hover:text-white`}
        >
            <Heart size={18} />
        </span>
    );
};

export default WishlistIconButton;
