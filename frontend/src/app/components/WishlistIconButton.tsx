"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import { addToWishlist } from "../../lib/api";
import { toast } from "sonner";
import { WishlistIconButtonProps } from "@types/allTypes";

const WishlistIconButton: React.FC<WishlistIconButtonProps> = ({ id, userId, token }) => {
    const [isAddedToWishlist, setIsAddedToWishlist] = useState<Boolean>(false)

    const handleAddToWishlist = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        if (!token) {
            toast.error("Please login to add to wishlist")

            return;
        }

        const response = await addToWishlist(id, userId, token);

        if (response && response?.data?.id) {
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
