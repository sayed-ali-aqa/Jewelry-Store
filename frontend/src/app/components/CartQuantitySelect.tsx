"use client"

import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CartQuantitySelectProps } from "@types/allTypes"
import { setCartStatus } from "../../store/slices/cartStatusSlice"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { toast } from "sonner"
import { updateCartItemQuantity } from "../../lib/api"

const CartQuantitySelect: React.FC<CartQuantitySelectProps> = ({ id, currentQuantity }) => {
    const cartStatus = useSelector((state: RootState) => state.cartStatus.cartStatus);
    const dispatch = useDispatch();

    const handleUpdateCartItemQuantity = async (quantity: string) => {
        const response = await updateCartItemQuantity(id, Number(quantity));

        if (response && response?.data?.id) {
            dispatch(setCartStatus(!cartStatus)); // Update Redux state
            toast.success("Cart item quantity updated");
        }
    };

    return (
        <Select onValueChange={handleUpdateCartItemQuantity} defaultValue={`${currentQuantity}`}>
            <SelectTrigger className="w-[70px]">
                <SelectValue placeholder={currentQuantity} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="1" className='transition-all duration-300 hover:bg-slate-200'>1</SelectItem>
                    <SelectItem value="2" className='transition-all duration-300 hover:bg-slate-200'>2</SelectItem>
                    <SelectItem value="3" className='transition-all duration-300 hover:bg-slate-200'>3</SelectItem>
                    <SelectItem value="4" className='transition-all duration-300 hover:bg-slate-200'>4</SelectItem>
                    <SelectItem value="5" className='transition-all duration-300 hover:bg-slate-200'>5</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default CartQuantitySelect
