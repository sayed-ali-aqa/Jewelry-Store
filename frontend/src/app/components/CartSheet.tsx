"use client"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { getCart } from "../../lib/api"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { AccountItemType, CartItem } from "@types/allTypes"
import EmptyPlaceholder from "@/(routes)/account/_components/EmptyPlaceholder"
import CartItemCard from "./CartItemCard"
const CartIcon = '/images/icons/empty-cart.png'

export function CartSheet() {
    const [cartCount, setCartCount] = useState<number>(0)
    const [cartData, setCartData] = useState<AccountItemType[]>([])
    const [cartSubTotal, setCartSubTotal] = useState<number>(0)
    const cartStatus = useSelector((state: RootState) => state.cartStatus.cartStatus);

    const fetchCart = async () => {
        try {
            const data = await getCart()
            setCartData(data.data)

        } catch (error) {
            toast.error("Failed to fetch cart")
        }
    }

    useEffect(() => {
        fetchCart()
    }, [cartStatus])

    useEffect(() => {
        if (cartData.length > 0) {
            const subtotal = cartData.reduce((acc, item) => {
                const { price, discount } = item.products;
                const discountedPrice = price - (price * discount / 100);
                return acc + (discountedPrice * item.quantity);
            }, 0);

            setCartSubTotal(subtotal);

            let totalCartCount = 0;
            cartData.map((item) => {
                totalCartCount += item.quantity
            })

            setCartCount(totalCartCount)
        }else{
            setCartSubTotal(0);
            setCartCount(0)
        }
    }, [cartData]);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className='transition-all duration-300 p-2 hover:text-primary cursor-pointer relative'>
                    <ShoppingBag size={20} />
                    <span className='absolute -top-1 right-0 bg-primary text-white text-xs font-semibold w-[22px] h-[22px] rounded-full text-center leading-[22px]'>{cartCount}</span>
                </div>
            </SheetTrigger>
            <SheetContent className="px-0">
                <SheetHeader className="text-left border-b pb-4 px-6">
                    <div>
                        <SheetTitle>My Cart ({cartCount})</SheetTitle>
                        <p>Subtotal: <span className="font-semibold ml-1">${(cartSubTotal).toFixed(2)}</span></p>
                    </div>
                </SheetHeader>
                <ScrollArea className="flex flex-col h-[66vh] w-full">
                    {cartData.length === 0 ? (
                        <EmptyPlaceholder
                            image={CartIcon}
                            text="You haven't added anything to your shopping cart yet."
                            actionText="Add To Cart Now"
                            imageSize={130}
                            clasName="max-h-[60vh] w-[300px] flex mx-auto"
                            isAction={false}
                        />
                    ) : (
                        <div className="w-full flex gap-x-6 gap-y-8 flex-wrap">
                            {
                                cartData.map((cart: AccountItemType, index: number) => (
                                    <CartItemCard key={index} cart={cart} />
                                ))
                            }
                        </div>
                    )}

                </ScrollArea>
                <SheetFooter className="h-[150px] pt-4 px-6 border-t-2">
                    <SheetClose asChild>
                        <div className="flex flex-col gap-3 w-full">
                            <Link href="/checkout" className="uppercase bg-black text-white w-full py-3 text-center transition-all duration-300 hover:bg-black/90">Proceed To Checkout</Link>
                            <Link href="/account/shopping-cart" className="uppercase border w-full py-3 text-center transition-all duration-300 hover:bg-black/90 hover:text-white">View All Items In Cart</Link>
                        </div>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
