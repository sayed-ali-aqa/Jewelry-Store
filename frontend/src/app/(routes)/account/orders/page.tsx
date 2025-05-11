"use client"

import React, { useEffect, useState } from 'react'
import { getOrders } from '../../../../lib/api'
import { toast } from 'sonner'
import EmptyPlaceholder from '../_components/EmptyPlaceholder'
import { orderProps } from '@types/allTypes'
import OrderItemCard from '../_components/OrderItemCard'
import OrderSkeletonLoader from '@/_components/OrderSkeletonLoader'
const orderIcon = '/images/icons/no-order.png'

const page = () => {
  const [orders, setOrders] = useState<orderProps[]>([])
  const [isLoding, setIsLoading] = useState<boolean>(true)

  const fetchCart = async () => {
    setIsLoading(true)

    try {
      const data = await getOrders()

      console.log(data.data[0].order_items[0].product.images[0].url);
      

      //If no data then set it to empty array
      setOrders(Object.keys(data.data).length > 0 ? data.data : [])
    } catch (error) {
      toast.error("Failed to fetch wishlist")
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <div className='bg-white min-h-full p-6'>
      {isLoding ? (
        <OrderSkeletonLoader />
      ) : (
        orders.length === 0 ? (
          <EmptyPlaceholder
            image={orderIcon}
            text="Your order list is currently empty."
            actionText="Continue Shopping"
          />
        ) : (
          <div className="w-full flex flex-col gap-x-6 gap-y-8 flex-wrap">
            {
              orders.map((item: orderProps, index: number) => (
                <OrderItemCard key={index} order={item} />
              ))
            }
          </div>
        )
      )}
    </div >
  )
}

export default page