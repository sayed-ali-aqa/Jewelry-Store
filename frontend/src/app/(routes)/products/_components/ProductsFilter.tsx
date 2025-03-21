"use client";

import React, { useEffect, useState } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from 'lucide-react';
import ProductsFilterCheckbox from './ProductsFilterCheckbox';
import { getProductsCategories, getProductsStyles, getProductsMaterials } from '../../../../lib/api';

// Define interfaces for the expected data structure of categories, styles, and materials
interface Category {
    category_name: string;
}

interface Style {
    // Define the properties for styles if needed
    name: string;
}

interface Material {
    // Define the properties for materials if needed
    type: string;
}

interface ProductsFilterProps {
    search: string;
    setSearch: (search: string) => void;
}

const ProductsFilter: React.FC<ProductsFilterProps> = ({ search, setSearch }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    // Type the state variables properly
    const [categories, setCategories] = useState<Category[]>([]);
    const [styles, setStyles] = useState<Style[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);

    const fetchData = async () => {
        const [categories, styles, materials] = await Promise.all([
            getProductsCategories(),
            getProductsStyles(),
            getProductsMaterials(),
        ]);

        setCategories(categories.data);
        setStyles(styles.data);
        setMaterials(materials.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='w-[300px] h-screen max-h-fit-content'>
            <div>
                <input
                    className='border-2 border-black'
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search here'
                />
            </div>

            <div className='mt-4'>
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
                    <CollapsibleContent className='px-2 py-4 flex flex-col gap-3'>
                        {
                            categories.length > 0 ? (categories.map((item, index) => (
                                // Ensure category_name is properly typed here
                                <ProductsFilterCheckbox key={index} index={index} category={item.category_name} />
                            ))) : <p className='text-slate-500 -mt-2'>No categories available</p>
                        }
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </div>
    );
};

export default ProductsFilter;
