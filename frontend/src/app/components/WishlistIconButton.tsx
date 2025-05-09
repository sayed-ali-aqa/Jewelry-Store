"use client";

import React, { useState } from "react";
import { Heart, Loader } from "lucide-react";
import { addToWishlist } from "../../lib/api";
import { toast } from "sonner";
import { WishlistIconButtonProps } from "@types/allTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setWishlistStatus } from "../../store/slices/wishlistStatusSlice";
import { Button } from "./ui/button";

const WishlistIconButton: React.FC<WishlistIconButtonProps> = ({ id }) => {
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
            variant="ghost"
            disabled={isLoading}
            onClick={handleAddToWishlist}
            className={`${isAddedToWishlist ? 'bg-primary text-white' : 'bg-white text-primary'} w-[34px] h-[34px] mr-4 rounded-full transition-all duration-300 hover:bg-primary hover:text-white`}
        >
            {
                isLoading ? (
                    <Loader size={18} className="animate-spin" />
                ) : (
                    <Heart size={18} />
                )
            }
        </Button>
    );
};

export default WishlistIconButton;
