"use client"

import React, { useEffect, useState } from 'react'
import { getCart } from '../../../../lib/api'
import { toast } from 'sonner'
import EmptyPlaceholder from '../_components/EmptyPlaceholder'
import { AccountItemType } from '@types/allTypes'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/store'
import ShoppingCartCard from '../_components/ShoppingCartCard'
const CartIcon = '/images/icons/empty-cart.png'

const page = () => {
  const [carts, setCarts] = useState<[]>([])
  const cartStatus = useSelector((state: RootState) => state.cartStatus.cartStatus);

  const fetchCart = async () => {
    try {
      const data = await getCart()
      setCarts(data.data)

    } catch (error) {
      toast.error("Failed to fetch wishlist")
    }
  }

  useEffect(() => {
    fetchCart()
  }, [cartStatus])

  return (
    <div>
      {carts.length === 0 ? (
        <EmptyPlaceholder
          image={CartIcon}
          text="You haven't added anything to your shopping cart yet."
          actionText="Add To Cart Now"
        />
      ) : (
        <div className="w-full flex gap-x-6 gap-y-8 flex-wrap">
          {
            carts.map((cart: AccountItemType) => (
              <ShoppingCartCard key={cart.documentId} cart={cart} className="xs:max-w-[280px] h-fit" />
            ))
          }
        </div>
      )}
    </div>
  )
}

export default page