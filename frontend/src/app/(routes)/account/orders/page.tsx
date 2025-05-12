"use client"

import React, { useEffect, useState } from 'react'
import { getOrders } from '../../../../lib/api'
import { toast } from 'sonner'
import EmptyPlaceholder from '../_components/EmptyPlaceholder'
import { orderProps } from '@types/allTypes'
import OrderItemCard from '../_components/OrderItemCard'
import OrderSkeletonLoader from '@/_components/OrderSkeletonLoader'
import { useRouter, useSearchParams } from 'next/navigation'
import CustomPagination from '@/_components/CustomPagination'
const orderIcon = '/images/icons/no-order.png'

const page = () => {
  const [orders, setOrders] = useState<orderProps[]>([])
  const [isLoding, setIsLoading] = useState<boolean>(true)

  // Pagination state
  const [totalPages, setTotalPages] = useState(1);

  // Pagination logic
  const searchParams = useSearchParams();
  const router = useRouter();

  // Pagination logic
  const currentPage = Number(searchParams.get('page') || '1');
  const setCurrentPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  const fetchOrders = async (page = 1) => {
    setIsLoading(true);
    try {
      const data = await getOrders(page, 4); // 4 = pageSize

      //If no data then set it to empty array
      setOrders(Object.keys(data.data).length > 0 ? data.data : [])
      setTotalPages(data?.meta?.pagination?.pageCount || 1);
    } catch (error) {
      toast.error("Failed to fetch wishlist");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  return (
    <div className='bg-white min-h-full p-4 md:p-6'>
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

      <CustomPagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div >
  )
}

export default page