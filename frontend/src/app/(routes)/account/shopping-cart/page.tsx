"use client"

import React, { useEffect, useState } from 'react'
import { getCart } from '../../../../lib/api'
import { toast } from 'sonner'
import EmptyPlaceholder from '../_components/EmptyPlaceholder'
import { AccountItemType } from '@types/allTypes'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/store'
import CartItemCard from '@/components/CartItemCard'
import ProductSkeletonLoader from '@/_components/ProductSkeletonLoader'
const CartIcon = '/images/icons/empty-cart.png'

const page = () => {
  const [carts, setCarts] = useState<[]>([])
  const cartStatus = useSelector((state: RootState) => state.cartStatus.cartStatus);
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchCart = async () => {
    setIsLoading(true)

    try {
      const data = await getCart()

      //If no data then set it to empty array
      setCarts(Object.keys(data).length > 0 ? data.data : [])
    } catch (error) {
      toast.error("Failed to fetch wishlist")
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [cartStatus])

  return (
    <div className='bg-white min-h-full p-6'>
      {isLoading ? (
        <div>
          <ProductSkeletonLoader />
        </div>
      ) : (
        carts.length === 0 ? (
          <EmptyPlaceholder
            image={CartIcon}
            text="You haven't added anything to your shopping cart yet."
            actionText="Add To Cart Now"
          />
        ) : (
          <div className="w-full flex gap-x-6 gap-y-8 flex-wrap">
            {carts.map((cart: AccountItemType) => (
              <CartItemCard
                key={cart.documentId}
                cart={cart} />
            ))}
          </div>
        )
      )}
    </div>
  )
}

export default page