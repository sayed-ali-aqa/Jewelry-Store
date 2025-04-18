"use client";

import React from "react";
import { X } from "lucide-react";
import { removeWishlist } from "../../../../lib/api";
import { toast } from "sonner";
import { WishlistIconButtonProps } from "@types/allTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { setWishlistStatus } from "../../../../store/slices/wishlistStatusSlice";

const WishlistRemoveButton: React.FC<WishlistIconButtonProps> = ({ id }) => {
    const wishlistStatus = useSelector((state: RootState) => state.wishlistStatus.wishlistStatus);
    const dispatch = useDispatch();

    const handleRemoveWishlistItem = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        const response = await removeWishlist(id);

        if (response && response?.status === 200) {
            dispatch(setWishlistStatus(!wishlistStatus)); // Update Redux state
            toast.success(response.message);
        } else {
            toast.error("Failed to remove wishlist");
        }
    };

    return (
        <span
            role="button"
            onClick={handleRemoveWishlistItem}
            className='bg-white p-2 text-destructive mr-4 rounded-full transition-all duration-300 hover:bg-destructive hover:text-white'
        >
            <X size={18} />
        </span>
    );
};

export default WishlistRemoveButton;
