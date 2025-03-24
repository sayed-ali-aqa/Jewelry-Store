"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Minus } from "lucide-react";

const ProductsFilterPriceRangeValuesInputs = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    // State for min and max price values
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    // Handle input changes
    const handlePriceChange = (type: "min" | "max", value: string) => {
        if (type === "min") {
            setMinPrice(value);
        } else {
            setMaxPrice(value);
        }
    };

    useEffect(() => {
        // Get existing price range from URL params
        const currentMinPrice = searchParams.get("priceRange")?.split("-")[0];
        const currentMaxPrice = searchParams.get("priceRange")?.split("-")[1];

        setMinPrice(currentMinPrice || "");
        setMaxPrice(currentMaxPrice || "");
    }, [searchParams]);

    // Update URL when values change
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        // Only add if both values are provided
        if (minPrice && maxPrice) {
            // Remove previous price filters
            params.delete("price");

            params.set("priceRange", `${minPrice}-${maxPrice}`);
        }

        router.push(`?${params.toString()}`, { scroll: false });
    }, [minPrice, maxPrice]);

    return (
        <div className="flex items-center gap-2 mt-2">
            <Input
                type="number"
                placeholder="Min ($)"
                min={1}
                max={1000}
                value={minPrice}
                onChange={(e) => handlePriceChange("min", e.target.value)}
            />

            <Minus />

            <Input
                type="number"
                placeholder="Max ($)"
                min={1}
                max={1000}
                value={maxPrice}
                onChange={(e) => handlePriceChange("max", e.target.value)}
            />
        </div>
    );
};

export default ProductsFilterPriceRangeValuesInputs;
