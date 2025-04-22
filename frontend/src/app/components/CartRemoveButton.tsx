"use client"

import * as React from "react"
import { CircleX, X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setCartStatus } from "../../store/slices/cartStatusSlice";
import { toast } from "sonner";
import { removeCartItem } from "../../lib/api";

export function CartRemoveButton({ id }: { id: string }) {
    const cartStatus = useSelector((state: RootState) => state.cartStatus.cartStatus);
    const dispatch = useDispatch();

    const handleRemoveCartItem = async () => {
        const response = await removeCartItem(id);

        if (response && response?.status === 200) {
            dispatch(setCartStatus(!cartStatus)); // Update Redux state
            toast.success("Cart item removed");
        } else {
            toast.error("Failed to remove cart item");
        }
    };

    return (
        <span role='button' onClick={handleRemoveCartItem}>
            <CircleX
                strokeWidth={1}
                size={34}
                className='text-slate-400 hover:text-destructive' />
        </span>
    )
}
