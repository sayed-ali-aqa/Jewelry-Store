"use client";
import React from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProductsFilterCheckbox from "./ProductsFilterCheckbox";

const FilterByStylesCollapsible = ({ styles }: { styles: { style: string }[] }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border-b">
            <CollapsibleTrigger className="w-full font-semibold flex justify-between items-center transition-all duration-300 hover:bg-slate-100 px-2 py-3">
                <span>Styles</span>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </CollapsibleTrigger>
            <CollapsibleContent className={`${isOpen && "py-4"} px-2 flex flex-col gap-3`}>
                {styles.length > 0 ? (
                    styles.map((item, index) => (
                        <ProductsFilterCheckbox key={index} listItem={item.style} filterKey="style" />
                    ))
                ) : (
                    <p className="text-slate-500 -mt-2">No styles available</p>
                )}
            </CollapsibleContent>
        </Collapsible>
    );
};

export default FilterByStylesCollapsible;
