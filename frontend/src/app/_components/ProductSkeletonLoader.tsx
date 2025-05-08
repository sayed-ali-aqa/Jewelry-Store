import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const ProductSkeletonLoader = () => {
    return (
        <div className='flex flex-col gap-6'>
            <div className='flex gap-6 border-b border-b-slate-100 pb-6'>
                <Skeleton className="w-[160px] h-[200px]" />

                <div className='flex flex-col justify-around'>
                    <div className='flex flex-col gap-4'>
                        <Skeleton className="w-[280px] h-[30px]" />
                        <Skeleton className="w-[180px] h-[20px]" />
                    </div>

                    <div className='flex flex-col gap-4'>
                        <Skeleton className="w-[220px] h-[20px]" />
                        <Skeleton className="w-[100px] h-[50px]" />
                    </div>
                </div>
            </div>

            <div className='flex gap-6'>
                <Skeleton className="w-[160px] h-[200px]" />

                <div className='flex flex-col justify-around'>
                    <div className='flex flex-col gap-4'>
                        <Skeleton className="w-[280px] h-[30px]" />
                        <Skeleton className="w-[180px] h-[20px]" />
                    </div>

                    <div className='flex flex-col gap-4'>
                        <Skeleton className="w-[220px] h-[20px]" />
                        <Skeleton className="w-[100px] h-[50px]" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductSkeletonLoader