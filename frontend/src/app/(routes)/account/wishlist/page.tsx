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
import { ChevronLeft, ChevronRight } from 'lucide-react'
const WishlistIcon = '/images/icons/empty-wishlist.png'

const page = () => {
  const wishlistStatus = useSelector((state: RootState) => state.wishlistStatus.wishlistStatus);
  const [wishlists, setWishlists] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchWishlist = async (page = 1) => {
    setIsLoading(true);
    try {
      const data = await getWishlist(page, 2); // 2 = pageSize

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
    <div className='bg-white min-h-full p-6'>
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

              {totalPages > 1 && (
                <div className="w-full mt-10 flex justify-center">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="flex items-center px-4 py-2 text-sm font-medium bg-muted hover:bg-gray-200 disabled:opacity-50"
                    >
                      <ChevronLeft size={18} />
                      Prev
                    </button>

                    {Array.from({ length: totalPages }).map((_, index) => {
                      const page = index + 1;
                      const isFirst = page === 1;
                      const isLast = page === totalPages;
                      const isNear = Math.abs(currentPage - page) <= 1;

                      if (isFirst || isLast || isNear) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 text-sm font-medium ${currentPage === page
                              ? 'bg-primary text-white'
                              : 'bg-muted hover:bg-gray-200'
                              }`}
                          >
                            {page}
                          </button>
                        );
                      }

                      // Show dots between distant pages
                      if (
                        (page === 2 && currentPage > 3) ||
                        (page === totalPages - 1 && currentPage < totalPages - 2)
                      ) {
                        return (
                          <div key={page} className="px-2 text-muted-foreground flex gap-1">
                            <span className='font-semibold'>.</span>
                            <span className='font-semibold'>.</span>
                            <span className='font-semibold'>.</span>
                          </div>
                        );
                      }

                      return null;
                    })}

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="flex items-center px-4 py-2 text-sm font-medium bg-muted hover:bg-gray-200 disabled:opacity-50"
                    >
                      Next
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        )
      }
    </div>
  )
}

export default page