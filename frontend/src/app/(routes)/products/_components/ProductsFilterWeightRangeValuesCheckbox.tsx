"use client";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useSearchParams, useRouter } from "next/navigation";
import { filterRangeValuesCheckBoxProps } from "@types/allTypes";

const ProductsFilterWeightRangeValuesCheckbox: React.FC<filterRangeValuesCheckBoxProps> = ({ listItem, filterKey }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentWeights = searchParams.getAll(filterKey); // Get multiple selected values
    const rangeValue = `${listItem[0]}-${listItem[1]}`;
    const isChecked = currentWeights.includes(rangeValue);

    const handleCheckboxChange = (checked: boolean) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("weightRange"); // Remove all weight input range values

        if (checked) {
            params.append(filterKey, rangeValue); // Append new filter value
        } else {
            params.delete(filterKey); // Remove all first
            currentWeights
                .filter((w) => w !== rangeValue)
                .forEach((w) => params.append(filterKey, w)); // Re-add remaining
        }

        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex items-center space-x-3">
            <Checkbox
                id={`${filterKey}-${rangeValue}`}
                checked={isChecked}
                onCheckedChange={handleCheckboxChange}
            />
            <label
                htmlFor={`${filterKey}-${rangeValue}`}
                className={`${isChecked ? "text-black" : "text-slate-500"} cursor-pointer select-none font-medium leading-none flex gap-2`}
            >
                <span>{listItem[0]}g</span>
                <span>-</span>
                <span>{listItem[1]}g</span>
            </label>
        </div>
    );
};

export default ProductsFilterWeightRangeValuesCheckbox;
