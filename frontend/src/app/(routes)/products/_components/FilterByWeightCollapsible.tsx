"use client";
import React from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { weightRanges } from "../../../../../datalist";
import ProductsFilterRangeValuesCheckbox from "./ProductsFilterRangeValuesCheckbox";

const FilterByWeightCollapsible = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border-b">
            <CollapsibleTrigger className="w-full font-semibold flex justify-between items-center transition-all duration-300 hover:bg-slate-100 px-2 py-3">
                <span>Weights</span>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </CollapsibleTrigger>

            <CollapsibleContent className={`${isOpen ? "py-4" : ""} px-2 flex flex-col gap-3`}>
                {weightRanges.length > 0 ? (
                    weightRanges.map((range, index) => (
                        <ProductsFilterRangeValuesCheckbox
                            key={index}
                            listItem={range}
                            filterKey="weight"
                        />
                    ))
                ) : (
                    <p className="text-slate-500 -mt-2">No weights available</p>
                )}
            </CollapsibleContent>
        </Collapsible>
    );
};

export default FilterByWeightCollapsible;
