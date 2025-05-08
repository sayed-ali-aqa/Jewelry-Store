import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const WishlistSkeletonLoader = () => {
  return (
    <div className='flex gap-6 flex-wrap'>
      <Skeleton className='w-[240px] h-[320px]' />
      <Skeleton className='w-[240px] h-[320px]' />
    </div>
  )
}

export default WishlistSkeletonLoader