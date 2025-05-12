"use client"

import React, { useEffect, useState } from 'react'
import { getWishlist } from '../../../../lib/api'
import { toast } from 'sonner'
import EmptyPlaceholder from '../_components/EmptyPlaceholder'
import WishlistCard from '../_components/WishlistCard'
import { AccountItemType } from '@types/allTypes'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/store'
import WishlistSkeletonLoader from '@/_components/WishlistSkeletonLoader'
import { useSearchParams, useRouter } from 'next/navigation'
import CustomPagination from '@/_components/CustomPagination'

const WishlistIcon = '/images/icons/empty-wishlist.png'

const page = () => {
  const wishlistStatus = useSelector((state: RootState) => state.wishlistStatus.wishlistStatus);
  const [wishlists, setWishlists] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
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

  const fetchWishlist = async (page = 1) => {
    setIsLoading(true);
    try {
      const data = await getWishlist(page, 8); // 8 = pageSize

      setWishlists(data?.data || []);
      setTotalPages(data?.meta?.pagination?.pageCount || 1);
    } catch (error) {
      toast.error("Failed to fetch wishlist");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist(currentPage);
  }, [wishlistStatus, currentPage]);

  return (
    <div className='bg-white min-h-full p-4 md:p-6'>
      {
        isLoading ? (
          <WishlistSkeletonLoader />
        ) : (
          wishlists.length === 0 ? (
            <EmptyPlaceholder
              image={WishlistIcon}
              text="You haven't added anything to your wishlist yet."
              actionText="Add To Wishlist Now"
            />
          ) : (
            <div className="w-full flex gap-x-6 gap-y-8 flex-wrap">
              {
                wishlists.map((wishlist: AccountItemType) => (
                  <WishlistCard
                    key={wishlist.documentId}
                    wishlist={wishlist}
                    className="xs:max-w-[280px] h-fit"
                  />
                ))
              }

              <CustomPagination 
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )
        )
      }
    </div>
  )
}

export default page
