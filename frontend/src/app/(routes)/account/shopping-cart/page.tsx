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
import { useRouter, useSearchParams } from 'next/navigation'
import CustomPagination from '@/_components/CustomPagination'
const CartIcon = '/images/icons/empty-cart.png'

const page = () => {
  const [carts, setCarts] = useState<[]>([])
  const cartStatus = useSelector((state: RootState) => state.cartStatus.cartStatus);
  const [isLoading, setIsLoading] = useState<boolean>(true)

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


  const fetchCart = async (page = 1) => {
    setIsLoading(true);
    try {
      const data = await getCart(page, 1); // 1 = pageSize

      //If no data then set it to empty array
      setCarts(Object.keys(data).length > 0 ? data.data : [])

      setTotalPages(data?.meta?.pagination?.pageCount || 1);
    } catch (error) {
      toast.error("Failed to fetch shopping cart");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart(currentPage);
  }, [cartStatus, currentPage]);

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

      <CustomPagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default page