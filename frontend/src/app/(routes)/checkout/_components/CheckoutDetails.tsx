"use client"

import React from 'react'
import { AccountItemType, CheckoutDetailsProps } from '@types/allTypes'
import { Button } from '@/components/ui/button'
import EmptyPlaceholder from '@/(routes)/account/_components/EmptyPlaceholder'
import CartItemCard from '@/components/CartItemCard'
const CartIcon = '/images/icons/empty-cart.png'

const CheckoutDetails: React.FC<CheckoutDetailsProps> = ({ cartData, cartCount, cartSubTotal, totalTax, totalShippingCost }) => {
    return (
        <div className='bg-white'>
            <h2 className='text-center text-2xl p-6'>Order Total ({cartCount})</h2>

            <div className='flex flex-col gap-4'>
                {!cartData || cartData.length === 0 ? (
                    <EmptyPlaceholder
                        image={CartIcon}
                        text="You haven't added anything to your shopping cart yet."
                        actionText="Add To Cart Now"
                        imageSize={130}
                        clasName="max-h-[60vh] w-[300px] flex mx-auto"
                        isAction={false}
                    />
                ) : (
                    <div className="w-full flex flex-wrap">
                        {
                            cartData.map((cart: AccountItemType, index: number) => (
                                <CartItemCard key={index} cart={cart} />
                            ))
                        }
                    </div>
                )}

                <div className='p-6 flex flex-col gap-4'>
                    <div className='flex items-center justify-between'>
                        <span>Subtotal</span>
                        <span>${(cartSubTotal).toFixed(2)}</span>
                    </div>

                    <div className='flex items-center justify-between'>
                        <span>Tax</span>
                        <span>${(totalTax).toFixed(2)}</span>
                    </div>

                    <div className='flex items-center justify-between'>
                        <span>Shipping</span>
                        <span>${totalShippingCost}</span>
                    </div>

                    <div className='flex items-center justify-between'>
                        <span className='font-semibold text-lg'>Total</span>
                        <span className='font-semibold text-lg'>${(totalShippingCost + totalTax + cartSubTotal).toFixed(2)}</span>
                    </div>
                </div>

                <div className='border-t border-black p-6'>
                    <p className='text-slate-500 mb-6 text-sm'>We use your personal information to complete your order, enhance your experience on our website, and for other purposes outlined in our privacy policy.</p>

                    <Button variant="dark" className='w-full text-lg h-14 select-none' disabled={cartData.length === 0}>Place Order</Button>
                </div>
            </div>
        </div>
    )
}

export default CheckoutDetails
