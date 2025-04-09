"use client";

import React from "react";
import { X } from "lucide-react";
import { removeCart } from "../../../../lib/api";
import { toast } from "sonner";
import { WishlistIconButtonProps } from "@types/allTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { setCartStatus } from "../../../../store/slices/cartStatusSlice";

const CartRemoveButton: React.FC<WishlistIconButtonProps> = ({ id }) => {
    const cartStatus = useSelector((state: RootState) => state.cartStatus.cartStatus);
    const dispatch = useDispatch();

    const handleRemoveCartItem = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        const response = await removeCart(id);

        if (response && response?.status === 200) {
            dispatch(setCartStatus(!cartStatus)); // Update Redux state
            toast.success(response.message);
        } else {
            toast.error("Failed to remove cart item");
        }
    };

    return (
        <span
            role="button"
            onClick={handleRemoveCartItem}
            className='bg-white p-2 text-destructive mr-4 rounded-full transition-all duration-300 hover:bg-destructive hover:text-white'
        >
            <X size={18} />
        </span>
    );
};

export default CartRemoveButton;
