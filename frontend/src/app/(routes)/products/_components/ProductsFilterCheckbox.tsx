"use client";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useSearchParams, useRouter } from "next/navigation";
import { filterCheckBoxProps } from "@types/allTypes";

const ProductsFilterCheckbox: React.FC<filterCheckBoxProps> = ({ listItem, filterKey }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentList = searchParams.getAll(filterKey); // Get selected categories

    // Check if the list item is already selected
    const isChecked = currentList.includes(listItem);

    const handleCheckboxChange = (checked: boolean) => {
        const params = new URLSearchParams(window.location.search);

        if (checked) {
            params.append(filterKey, listItem); // Add list item to filter
        } else {
            const updatedList = currentList.filter((c) => c !== listItem);
            params.delete(filterKey); // Remove all categories first
            updatedList.forEach((c) => params.append(filterKey, c)); // Add back filtered ones
        }

        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex items-center space-x-3">
            <Checkbox
                id={listItem}
                checked={isChecked}
                onCheckedChange={handleCheckboxChange}
            />
            <label
                htmlFor={listItem}
                className={`${isChecked ? "text-black" : "text-slate-500"} cursor-pointer select-none font-medium leading-none`}
            >
                {listItem}
            </label>
        </div>
    );
};

export default ProductsFilterCheckbox;
