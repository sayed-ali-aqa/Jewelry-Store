"use client"
import React from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from 'lucide-react';
import ProductsFilterCheckbox from './ProductsFilterCheckbox';

const FilterCategoriesCollapsible = ({ categories }: { categories: { category_name: string }[] }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className='border-b'>
            <CollapsibleTrigger className='w-full font-semibold flex justify-between items-center transition-all duration-300 hover:bg-slate-100 px-2 py-3'>
                <span>Categories</span>
                {
                    isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />
                }
            </CollapsibleTrigger>
            <CollapsibleContent className={`${isOpen && 'py-4'} px-2 flex flex-col gap-3`}>
                {
                    categories.length > 0 ? (categories.map((item, index) => (
                        // Ensure category_name is properly typed here
                        <ProductsFilterCheckbox key={index} index={index} category={item.category_name} />
                    ))) : <p className='text-slate-500 -mt-2'>No categories available</p>
                }
            </CollapsibleContent>
        </Collapsible>
    )
}

export default FilterCategoriesCollapsible