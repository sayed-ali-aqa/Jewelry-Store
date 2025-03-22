"use client";

import React, { useEffect, useState } from 'react';
import { getProductsCategories, getProductsStyles, getProductsMaterials } from '../../../../lib/api';
import FilterByCategoriesCollapsible from './FilterByCategoriesCollapsible';
import SearchProductsInput from './SearchProductsInput';
import FilterByStylesCollapsible from './FilterByStylesCollapsible';
import { CategoryProps, StyleProps, MaterialProps } from '@types/allTypes';
import FilterByMaterialsCollapsible from './FilterByMaterialsCollapsible';

const ProductsFilter: React.FC = () => {
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [styles, setStyles] = useState<StyleProps[]>([]);
    const [materials, setMaterials] = useState<MaterialProps[]>([]);

    const fetchData = async () => {
        const [categoriesData, stylesData, materialsData] = await Promise.all([
            getProductsCategories(),
            getProductsStyles(),
            getProductsMaterials(),
        ]);

        setCategories(categoriesData.data);
        setStyles(stylesData.data);
        setMaterials(materialsData.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='w-[250px] min-w-[250px] h-screen max-h-fit-content'>
            <SearchProductsInput />

            <div className='mt-4'>
                <FilterByCategoriesCollapsible categories={categories} />
                <FilterByStylesCollapsible styles={styles} />
                <FilterByMaterialsCollapsible materials={materials} />
            </div>
        </div>
    );
};

export default ProductsFilter;
