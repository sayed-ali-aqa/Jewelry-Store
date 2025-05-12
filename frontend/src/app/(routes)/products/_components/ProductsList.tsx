"use client";

import React, { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { Product, ProductsListProps } from "@types/allTypes";
import { useSearchParams, useRouter } from "next/navigation";
import ProductsFilter from "./ProductsFilter";
import ProductCard from "@/components/ProductCard";
import CustomPagination from "@/_components/CustomPagination";

const ProductsList: React.FC<ProductsListProps> = ({ initialProducts }) => {
    const [products, setProducts] = useState(initialProducts.data);

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

    useEffect(() => {
        const page = parseInt(searchParams.get("page") || "1", 10);
        setCurrentPage(page);
    }, [currentPage, searchParams]);

    const fetchProducts = useMemo(
        () =>
            debounce(async () => {
                const page = parseInt(searchParams.get("page") || "1", 10);
                const search = searchParams.get("search") || "";
                const categories = searchParams.getAll("category");
                const styles = searchParams.getAll("style");
                const materials = searchParams.getAll("material");
                const weightRanges = searchParams.getAll("weight").length > 0 ? searchParams.getAll("weight") : searchParams.getAll("weightRange");
                const priceRanges = searchParams.getAll("price").length > 0 ? searchParams.getAll("price") : searchParams.getAll("priceRange");

                let filters: string[] = [];

                if (search.trim()) {
                    filters.push(`filters[name][$contains]=${search}`);
                }
                categories.forEach(c => filters.push(`filters[$and][0][category][category][$eq]=${encodeURIComponent(c)}`));
                styles.forEach((s, index) => filters.push(`filters[$or][${index}][style][style][$eq]=${encodeURIComponent(s)}`));
                materials.forEach((m, index) => filters.push(`filters[$or][${index}][material][material][$eq]=${encodeURIComponent(m)}`));

                weightRanges.forEach((range, index) => {
                    const [min, max] = range.split("-").map(Number);
                    filters.push(`filters[$or][${index}][weight][$gte]=${min}`);
                    filters.push(`filters[$or][${index}][weight][$lte]=${max}`);
                });

                priceRanges.forEach((range, index) => {
                    const [min, max] = range.split("-").map(Number);
                    filters.push(`filters[$or][${index}][price][$gte]=${min}`);
                    filters.push(`filters[$or][${index}][price][$lte]=${max}`);
                });

                const filterQuery = filters.length > 0 ? `&${filters.join("&")}` : "";
                const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=1&populate=images&populate=category${filterQuery}`;

                const res = await fetch(url);
                const data = await res.json();

                // console.log(data);

                setProducts(data.data);
                setTotalPages(data?.meta?.pagination?.pageCount || 1);
            }, 500),
        [searchParams]
    );

    useEffect(() => {
        fetchProducts();
        return () => {
            fetchProducts.cancel();
        };
    }, [currentPage, searchParams]);

    return (
        <section className="flex gap-10 flex-col md:flex-row min-h-[80vh]">
            <ProductsFilter />

            <div className="flex flex-col gap-6 w-full">
                <div className="w-full flex gap-6 flex-wrap">
                    {products.length > 0 ? (
                        products.map((product: Product) => (
                            <ProductCard key={product.documentId} product={product} className="xs:max-w-[280px] h-fit" />
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
