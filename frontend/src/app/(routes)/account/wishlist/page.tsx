"use client"

import React, { useEffect, useState } from 'react'
import { getWishlist } from '../../../../lib/api'
import { toast } from 'sonner'
import EmptyPlaceholder from '../_components/EmptyPlaceholder'
import WishlistCard from '../_components/WishlistCard'
import { WishlistType } from '@types/allTypes'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/store'
const WishlistIcon = '/images/icons/empty-wishlist.png'

const page = () => {
  const [wishlists, setWishlists] = useState<[]>([])
  const wishlistStatus = useSelector((state: RootState) => state.wishlistStatus.wishlistStatus);

  const fetchWishlist = async () => {
    try {
      const data = await getWishlist()
      setWishlists(data.data)

    } catch (error) {
      toast.error("Failed to fetch wishlist")
    }
  }

  useEffect(() => {
    fetchWishlist()
  }, [wishlistStatus])

  return (
    <div>
      {wishlists.length === 0 ? (
        <EmptyPlaceholder
          image={WishlistIcon}
          text="You haven't added anything to your wishlist yet."
          actionText="Add To Wishlist Now"
        />
      ) : (
        <div className="w-full flex gap-x-6 gap-y-8 flex-wrap">
          {
            wishlists.map((wishlist: WishlistType) => (
              <WishlistCard key={wishlist.id} wishlist={wishlist} className="xs:max-w-[280px] h-fit" />
            ))
          }
        </div>
      )}
    </div>
  )
}

export default page