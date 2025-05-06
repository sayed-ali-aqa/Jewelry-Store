"use client"

import React, { useEffect, useState } from 'react'
import { getOrders } from '../../../../lib/api'
import { toast } from 'sonner'
import EmptyPlaceholder from '../_components/EmptyPlaceholder'
import { orderProps } from '@types/allTypes'
import OrderItemCard from '../_components/OrderItemCard'
const orderIcon = '/images/icons/no-order.png'

const page = () => {
  const [orders, setOrders] = useState<orderProps[]>([])

  const fetchCart = async () => {
    try {
      const data = await getOrders()

      //If no data then set it to empty array
      setOrders(Object.keys(data.data).length > 0 ? data.data : [])
    } catch (error) {
      toast.error("Failed to fetch wishlist")
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <div className='bg-white min-h-full p-6'>
      {orders.length === 0 ? (
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
      }
    </div >
  )
}

export default page