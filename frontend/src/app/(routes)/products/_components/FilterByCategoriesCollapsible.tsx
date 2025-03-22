"use client";
import React, { useEffect } from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProductsFilterCheckbox from "./ProductsFilterCheckbox";

const FilterByCategoriesCollapsible = ({ categories }: { categories: { category: string }[] }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
        setIsOpen(categories.length > 0 ? true : false);
    }, [categories])

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border-b">
            <CollapsibleTrigger className="w-full font-semibold flex justify-between items-center transition-all duration-300 hover:bg-slate-100 px-2 py-3">
                <span>Categories</span>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </CollapsibleTrigger>
            <CollapsibleContent className={`${isOpen && "py-4"} px-2 flex flex-col gap-3`}>
                {categories.length > 0 ? (
                    categories.map((item, index) => (
                        <ProductsFilterCheckbox key={index} listItem={item.category} filterKey="category" />
                    ))
                ) : (
                    <p className="text-slate-500 -mt-2">No categories available</p>
                )}
            </CollapsibleContent>
        </Collapsible>
    );
};

export default FilterByCategoriesCollapsible;
