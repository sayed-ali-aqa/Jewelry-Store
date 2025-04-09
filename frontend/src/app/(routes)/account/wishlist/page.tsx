"use client"

import React, { useEffect, useState } from 'react'
import { getWishlist } from '../../../../lib/api'
import { toast } from 'sonner'
import EmptyPlaceholder from '../_components/EmptyPlaceholder'
const WishlistIcon = '/images/icons/empty-wishlist.png'

const page = () => {
  const [wishlist, setWishlist] = useState<[]>([])

  const fetchWishlist = async () => {
    try {
      const data = await getWishlist()
      console.log(data.data);
      setWishlist(data.data)

    } catch (error) {
      toast.error("Failed to fetch wishlist")
    }
  }

  useEffect(() => {
    fetchWishlist()
  }, [])

  return (
    <div>
      {wishlist.length === 0 ? (
        <EmptyPlaceholder
          image={WishlistIcon}
          text="You haven't added anything to your wishlist yet."
          actionText="Add To Wishlist Now"
        />
      ) : (
        <h1>hi</h1>
      )}
    </div>
  )
}

export default page