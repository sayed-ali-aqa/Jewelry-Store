"use client";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useSearchParams, useRouter } from "next/navigation";

const ProductsFilterCheckbox = ({ category }: { category: string }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const currentCategories = searchParams.getAll("category"); // Get selected categories

    // Check if the category is already selected
    const isChecked = currentCategories.includes(category);

    const handleCheckboxChange = (checked: boolean) => {
        const params = new URLSearchParams(window.location.search);

        if (checked) {
            params.append("category", category); // Add category to filter
        } else {
            const updatedCategories = currentCategories.filter((c) => c !== category);
            params.delete("category"); // Remove all categories first
            updatedCategories.forEach((c) => params.append("category", c)); // Add back filtered ones
        }

        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex items-center space-x-3">
            <Checkbox
                id={category}
                checked={isChecked}
                onCheckedChange={handleCheckboxChange}
            />
            <label
                htmlFor={category}
                className={`${isChecked ? "text-black" : "text-slate-500"} cursor-pointer select-none font-medium leading-none`}
            >
                {category}
            </label>
        </div>
    );
};

export default ProductsFilterCheckbox;
