"use client";
import React from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProductsFilterCheckbox from "./ProductsFilterCheckbox";

const FilterByMaterialsCollapsible = ({ materials }: { materials: { material: string }[] }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border-b">
            <CollapsibleTrigger className="w-full font-semibold flex justify-between items-center transition-all duration-300 hover:bg-slate-100 px-2 py-3">
                <span>Materials</span>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </CollapsibleTrigger>
            <CollapsibleContent className={`${isOpen && "py-4"} px-2 flex flex-col gap-3`}>
                {materials.length > 0 ? (
                    materials.map((item, index) => (
                        <ProductsFilterCheckbox key={index} listItem={item.material} filterKey="material" />
                    ))
                ) : (
                    <p className="text-slate-500 -mt-2">No materials available</p>
                )}
            </CollapsibleContent>
        </Collapsible>
    );
};

export default FilterByMaterialsCollapsible;
