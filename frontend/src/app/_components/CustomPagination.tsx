import { CustomPaginationProps } from '@types/allTypes';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react'

const CustomPagination: React.FC<CustomPaginationProps> = ({totalPages, currentPage, setCurrentPage}) => {
    return (
        <>
            {totalPages > 1 && (
                <div className="w-full mt-10 flex justify-center">
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
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
                            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="flex items-center px-4 py-2 text-sm font-medium bg-muted hover:bg-gray-200 disabled:opacity-50"
                        >
                            Next
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default CustomPagination