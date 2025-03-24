"use client";
import React from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Minus } from "lucide-react";
import { priceRanges } from "../../../../../datalist";
import ProductsFilterPriceRangeValuesCheckbox from "./ProductsFilterPriceRangeValuesCheckbox";
import ProductsFilterPriceRangeValuesInputs from "./ProductsFilterPriceRangeValuesInputs";

const FilterByPriceCollapsible = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border-b">
            <CollapsibleTrigger className="w-full font-semibold flex justify-between items-center transition-all duration-300 hover:bg-slate-100 px-2 py-3">
                <span>Price</span>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </CollapsibleTrigger>

            <CollapsibleContent className={`${isOpen ? "py-4" : ""} px-2 flex flex-col gap-3`}>
                {priceRanges.length > 0 ? (
                    priceRanges.map((range, index) => (
                        <ProductsFilterPriceRangeValuesCheckbox
                            key={index}
                            listItem={range}
                            filterKey="price"
                        />
                    ))
                ) : (
                    <p className="text-slate-500 -mt-2">No prices available</p>
                )}

                <ProductsFilterPriceRangeValuesInputs />
            </CollapsibleContent>
        </Collapsible>
    );
};

export default FilterByPriceCollapsible;
