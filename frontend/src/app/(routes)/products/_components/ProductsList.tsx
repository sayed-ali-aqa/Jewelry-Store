"use client";

import React, { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { Product, ProductsListProps } from "@types/allTypes";
import { useSearchParams, useRouter } from "next/navigation";
import ProductsFilter from "./ProductsFilter";
import ProductCard from "@/components/ProductCard";
import ProductsPagination from "./ProductsPagination";

const ProductsList: React.FC<ProductsListProps> = ({ initialProducts }) => {
    const [products, setProducts] = useState(initialProducts.data);
    const [pagination, setPagination] = useState(initialProducts.meta.pagination);
    const [currentPage, setCurrentPage] = useState(0);

    const searchParams = useSearchParams();

    useEffect(() => {
        setCurrentPage(parseInt(searchParams.get("start") || "0", 10))
    }, [])

    const fetchProducts = useMemo(
        () =>
            debounce(async () => {
                const start = parseInt(searchParams.get("start") || "0", 10);
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
                const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?sort=createdAt:desc&pagination[start]=${start}&pagination[limit]=8&populate=images&populate=category${filterQuery}`;

                const res = await fetch(url);
                const data = await res.json();

                setProducts(data.data);
                setPagination(data.meta.pagination);
            }, 500),
        [searchParams]
    );

    useEffect(() => {
        fetchProducts();
        return () => {
            fetchProducts.cancel();
        };
    }, [searchParams]);

    return (
        <section className="flex gap-10 flex-col md:flex-row min-h-[80vh]">
            <ProductsFilter />

            <div className="flex flex-col gap-6 w-full">
                <div className="w-full flex gap-6 flex-wrap">
                    {products.length > 0 ? (
                        products.map((product: Product) => (
                            <ProductCard key={product.id} product={product} className="xs:max-w-[280px] h-fit" />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No products available</p>
                    )}
                </div>

                <ProductsPagination
                    pagination={pagination}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </section>
    );
};

export default ProductsList;
