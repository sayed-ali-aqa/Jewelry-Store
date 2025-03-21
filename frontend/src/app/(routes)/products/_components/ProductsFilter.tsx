"use client";

import React, { useEffect, useState } from 'react';
import { getProductsCategories, getProductsStyles, getProductsMaterials } from '../../../../lib/api';
import FilterByCategoriesCollapsible from './FilterByCategoriesCollapsible';

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
                <FilterByCategoriesCollapsible categories={categories} />
            </div>
        </div>
    );
};

export default ProductsFilter;
