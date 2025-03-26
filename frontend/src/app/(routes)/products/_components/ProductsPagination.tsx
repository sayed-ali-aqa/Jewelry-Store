"use client"

import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

interface ProductsPaginationProps {
    pagination: {
        start: number;
        limit: number;
        total: number;
    },
    currentPage: number,
    setCurrentPage: (newStart: number) => void
}

const ProductsPagination: React.FC<ProductsPaginationProps> = ({ pagination, currentPage, setCurrentPage }) => {
    const router = useRouter();

    const totalPages = Math.ceil(pagination.total / pagination.limit);

    const handlePageChange = (newStart: number) => {
        if (newStart >= 0 && newStart < totalPages) {
            setCurrentPage(newStart);
            router.push(`?start=${newStart}`, { scroll: false });
        }
    };

    return (
        <Pagination className="flex justify-center mt-10">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 8)}
                        aria-label="Go to previous page"
                        className={currentPage === 0 ? "text-slate-500 hover:bg-white hover:text-slate-500" : ""}
                    />
                </PaginationItem>

                <PaginationItem>
                    <PaginationLink isActive={currentPage === 0} onClick={() => handlePageChange(0)}>1</PaginationLink>
                </PaginationItem>

                {currentPage > 3 && <PaginationItem><PaginationEllipsis /></PaginationItem>}

                {Array.from({ length: 5 }, (_, i) => currentPage - 2 + i)
                    .filter(page => page > 0 && page < totalPages - 1)
                    .map(page => (
                        <PaginationItem key={page}>
                            <PaginationLink isActive={currentPage === page} onClick={() => handlePageChange(page)}>
                                {page + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                {currentPage < totalPages - 4 && <PaginationItem><PaginationEllipsis /></PaginationItem>}

                {totalPages > 1 && (
                    <PaginationItem>
                        <PaginationLink isActive={currentPage === totalPages - 1} onClick={() => handlePageChange(totalPages - 8)}>
                            {totalPages}
                        </PaginationLink>
                    </PaginationItem>
                )}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => handlePageChange(currentPage + 8)}
                        aria-label="Go to next page"
                        className={currentPage * 8 === totalPages - 1 ? "text-slate-500 hover:bg-white hover:text-slate-500" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default ProductsPagination