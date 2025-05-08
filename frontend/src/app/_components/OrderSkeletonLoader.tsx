import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import ProductSkeletonLoader from './ProductSkeletonLoader'

const OrderSkeletonLoader = () => {
    return (
        <div className='flex flex-col gap-6'>
            <div className='flex  gap-4 justify-between flex-wrap bg-slate-50 p-6'>
                <div className='flex flex-col gap-3'>
                  <Skeleton className='w-[150px] h-[20px]' />  
                  <Skeleton className='w-[150px] h-[30px]' />  
                </div>

                <div className='flex flex-col gap-3'>
                  <Skeleton className='w-[150px] h-[20px]' />  
                  <Skeleton className='w-[150px] h-[30px]' />  
                </div>

                <div className='flex flex-col gap-3'>
                  <Skeleton className='w-[150px] h-[20px]' />  
                  <Skeleton className='w-[150px] h-[30px]' />  
                </div>

                <div className='flex flex-col gap-3'>
                  <Skeleton className='w-[150px] h-[20px]' />  
                  <Skeleton className='w-[150px] h-[30px]' />  
                </div>
            </div>

            <ProductSkeletonLoader />
        </div>
    )
}

export default OrderSkeletonLoader