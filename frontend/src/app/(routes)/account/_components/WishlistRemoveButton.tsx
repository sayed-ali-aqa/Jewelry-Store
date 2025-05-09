"use client";

import React, { useState } from "react";
import { Loader, X } from "lucide-react";
import { removeWishlist } from "../../../../lib/api";
import { toast } from "sonner";
import { WishlistIconButtonProps } from "@types/allTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { setWishlistStatus } from "../../../../store/slices/wishlistStatusSlice";
import { Button } from "@/components/ui/button";

const WishlistRemoveButton: React.FC<WishlistIconButtonProps> = ({ id }) => {
    const wishlistStatus = useSelector((state: RootState) => state.wishlistStatus.wishlistStatus);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleRemoveWishlistItem = async (e: React.MouseEvent) => {
        setIsLoading(true)

        e.stopPropagation();
        e.preventDefault();

        const response = await removeWishlist(id);

        if (response && response?.status === 200) {
            dispatch(setWishlistStatus(!wishlistStatus)); // Update Redux state
            toast.success(response.message);
        } else {
            toast.error("Failed to remove wishlist");
        }

        setIsLoading(false)
    };

    return (
        <Button
            variant="ghost"
            onClick={handleRemoveWishlistItem}
            className='w-[34px] h-[34px] bg-white text-destructive mr-4 rounded-full transition-all duration-300 hover:bg-destructive hover:text-white'
        >
            {
                isLoading ? (
                    <Loader size={18} className="animate-spin" />
                ) : (
                    <X size={18} />
                )
            }
        </Button>
    );
};

export default WishlistRemoveButton;
