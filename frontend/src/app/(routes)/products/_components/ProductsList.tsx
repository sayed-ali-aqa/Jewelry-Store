"use client";

import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { Product, ProductsListProps } from "@types/allTypes";
import { useSearchParams, useRouter } from "next/navigation";
import ProductsFilter from "./ProductsFilter";
import ProductCard from "@/components/ProductCard";
import CustomPagination from "@/_components/CustomPagination";
import { buildFilterQuery } from "@utils/functions/productsPagination";

const ProductsList: React.FC<ProductsListProps> = ({ initialProducts }) => {
    const [products, setProducts] = useState(initialProducts.data);
    const [totalPages, setTotalPages] = useState(1);

    const searchParams = useSearchParams();
    const router = useRouter();

    const currentPage = Number(searchParams.get("page") || "1");

    const setCurrentPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`?${params.toString()}`);
    };

    const fetchProducts = useCallback(
        debounce(async () => {
            const page = parseInt(searchParams.get("page") || "1", 10);
            const filterQuery = buildFilterQuery(searchParams);

            const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=8&populate=images&populate=category${filterQuery}`;

            const res = await fetch(url);
            const data = await res.json();

            setProducts(data.data);
            setTotalPages(data?.meta?.pagination?.pageCount || 1);
        }, 500),
        [searchParams.toString()] // dependency as string to avoid reruns
    );

    useEffect(() => {
        fetchProducts();
        return () => {
            fetchProducts.cancel();
        };
    }, [fetchProducts]);

    return (
        <section className="flex gap-10 flex-col md:flex-row min-h-[80vh]">
            <ProductsFilter />

            <div className="flex flex-col gap-6 w-full">
                <div className="w-full flex gap-6 flex-wrap">
                    {products.length > 0 ? (
                        products.map((product: Product) => (
                            <ProductCard
                                key={product.documentId}
                                product={product}
                                className="xs:max-w-[280px] h-fit"
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No products available</p>
                    )}
                </div>

                <CustomPagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </section>
    );
};

export default ProductsList;
