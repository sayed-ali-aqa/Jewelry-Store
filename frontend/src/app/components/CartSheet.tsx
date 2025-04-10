import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShoppingBag } from "lucide-react"
const ImageUrl = "/images/products/01.jpg"
import Image from "next/image"
import { CartQuantitySelect } from "./CartQuantitySelect"
import { CartRemoveButton } from "./CartRemoveButton"
import Link from "next/link"

export function CartSheet({ cartCount = 0 }: { cartCount: number }) {
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
                        <p>Subtotal: <span className="font-semibold ml-1">$237.33</span></p>
                    </div>
                </SheetHeader>
                <ScrollArea className="flex flex-col h-[66vh] w-full">
                    <div className="flex gap-4 p-6 w-full border-b">
                        <div>
                            <Image
                                src={ImageUrl}
                                alt="image"
                                width={120}
                                height={150}
                            />
                        </div>
                        <div className="flex flex-col justify-around w-full">
                            <div>
                                <h3 className="font-semibold mb-[2px]">Cotton floral print Dress</h3>
                                <span className="text-slate-500 font-semibold">$340.00</span>
                            </div>
                            <div className="flex justify-between">
                                <CartQuantitySelect />

                                <CartRemoveButton />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 p-6 w-full border-b">
                        <div>
                            <Image
                                src={ImageUrl}
                                alt="image"
                                width={120}
                                height={150}
                            />
                        </div>
                        <div className="flex flex-col justify-around w-full">
                            <div>
                                <h3 className="font-semibold mb-[2px]">Cotton floral print Dress</h3>
                                <span className="text-slate-500 font-semibold">$340.00</span>
                            </div>
                            <div className="flex justify-between">
                                <CartQuantitySelect />

                                <CartRemoveButton />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 p-6 w-full border-b">
                        <div>
                            <Image
                                src={ImageUrl}
                                alt="image"
                                width={120}
                                height={150}
                            />
                        </div>
                        <div className="flex flex-col justify-around w-full">
                            <div>
                                <h3 className="font-semibold mb-[2px]">Cotton floral print Dress</h3>
                                <span className="text-slate-500 font-semibold">$340.00</span>
                            </div>
                            <div className="flex justify-between">
                                <CartQuantitySelect />

                                <CartRemoveButton />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 p-6 w-full border-b">
                        <div>
                            <Image
                                src={ImageUrl}
                                alt="image"
                                width={120}
                                height={150}
                            />
                        </div>
                        <div className="flex flex-col justify-around w-full">
                            <div>
                                <h3 className="font-semibold mb-[2px]">Cotton floral print Dress</h3>
                                <span className="text-slate-500 font-semibold">$340.00</span>
                            </div>
                            <div className="flex justify-between">
                                <CartQuantitySelect />

                                <CartRemoveButton />
                            </div>
                        </div>
                    </div>
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
