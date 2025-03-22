"use client";

import React, { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import ProductCard from "@/components/ProductCard";
import { Product } from "@types/allTypes";
import ProductsFilter from "./ProductsFilter";
import { useSearchParams } from "next/navigation";

const ProductsList = ({ initialProducts }: { initialProducts: Product[] }) => {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState(initialProducts);

    // Define debounced search function
    const fetchFilteredProducts = useMemo(
        () =>
            debounce(async (query: string, categories: string[], styles: string[], materials: string[], weightRanges: string[]) => {
                let filters: string[] = [];

                const searchQuery = `filters[name][$contains]=${query}`;

                // Add category filters
                if (categories.length > 0) {
                    categories.forEach((c) => {
                        filters.push(`filters[$and][0][category][category][$eq]=${encodeURIComponent(c)}`);
                    });
                }

                // Add style filters
                if (styles.length > 0) {
                    styles.forEach((s, index) => {
                        filters.push(`filters[$or][${categories.length + index}][style][style][$eq]=${encodeURIComponent(s)}`);
                    });
                }

                // Add materials filters
                if (materials.length > 0) {
                    materials.forEach((m, index) => {
                        filters.push(`filters[$or][${materials.length + index}][material][material][$eq]=${encodeURIComponent(m)}`);
                    });
                }

                // Add weight filters as range queries
                if (weightRanges.length > 0) {
                    weightRanges.forEach((range, index) => {
                        const [min, max] = range.split("-").map(Number); // Convert "1-10" to [1,10]
                        filters.push(
                            `filters[$or][${index}][weight][$gte]=${min}`
                        );
                        filters.push(
                            `filters[$or][${index}][weight][$lte]=${max}`
                        );
                    });
                }

                // Construct the final query
                const filterQuery = filters.length > 0 ? `&${filters.join("&")}` : "";

                const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?sort=createdAt:desc&pagination[limit]=8&populate=images&populate=category&${searchQuery}&${filterQuery}`;

                const res = await fetch(url);
                const data = await res.json();
                setProducts(data.data);
            }, 500),
        []
    );

    useEffect(() => {
        const search = searchParams.get("search") || "";
        const categories = searchParams.getAll("category"); // Handle multiple category filters
        const styles = searchParams.getAll("style"); // Handle multiple style filters
        const materials = searchParams.getAll("material"); // Handle multiple material filters
        const weightRanges = searchParams.getAll("weight"); // Handle multiple weight filters

        if (search.trim() || categories.length > 0 || styles.length > 0 || materials.length > 0 || weightRanges.length > 0) {
            fetchFilteredProducts(search, categories, styles, materials, weightRanges);
        } else {
            setProducts(initialProducts);
        }

        return () => {
            fetchFilteredProducts.cancel();
        };
    }, [searchParams]);

    return (
        <section className="flex gap-10">
            <ProductsFilter />

            <div className="w-full flex gap-6 flex-wrap">
                {products && products.length > 0 ? (
                    products.map((product: Product) => (
                        <ProductCard key={product.id} product={product} className="max-w-[280px] h-fit" />
                    ))
                ) : (
                    <p className="text-gray-500">No products available</p>
                )}
            </div>
        </section>
    );
};

export default ProductsList;
