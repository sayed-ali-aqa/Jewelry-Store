"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Minus } from "lucide-react";

const ProductsFilterWeightRangeValuesInputs = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    // State for min and max weight values
    const [minWeight, setMinWeight] = useState("");
    const [maxWeight, setMaxWeight] = useState("");

    // Handle input changes
    const handleWeightChange = (type: "min" | "max", value: string) => {
        if (type === "min") {
            setMinWeight(value);
        } else {
            setMaxWeight(value);
        }
    };

    useEffect(() => {
        // Get existing weight range from URL params
        const currentMinWeight = searchParams.get("weightRange")?.split("-")[0];
        const currentMaxWeight = searchParams.get("weightRange")?.split("-")[1];

        setMinWeight(currentMinWeight || "");
        setMaxWeight(currentMaxWeight || "");
    }, [searchParams]);

    // Update URL when values change
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        // Only add if both values are provided
        if (minWeight && maxWeight) {
            // Remove previous weight filters
            params.delete("weight");

            params.set("weightRange", `${minWeight}-${maxWeight}`);
        }

        router.push(`?${params.toString()}`, { scroll: false });
    }, [minWeight, maxWeight]);

    return (
        <div className="flex items-center gap-2 mt-2">
            <Input
                type="number"
                placeholder="Min (g)"
                min={1}
                max={1000}
                value={minWeight}
                onChange={(e) => handleWeightChange("min", e.target.value)}
            />

            <Minus />

            <Input
                type="number"
                placeholder="Max (g)"
                min={1}
                max={1000}
                value={maxWeight}
                onChange={(e) => handleWeightChange("max", e.target.value)}
            />
        </div>
    );
};

export default ProductsFilterWeightRangeValuesInputs;
