// -------------  It's typically used for client-side fetching (e.g., in useEffect, inside components) or for utility functions, and is not the ideal place for ISR or SSR. ------------------

import axios from 'axios';
import { ProductsApiResponse, ProductsApiResponseWithoutPagination } from "@types/allTypes";

export async function getNewProducts(): Promise<ProductsApiResponseWithoutPagination> {
    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?sort=createdAt:desc&pagination[limit]=8&populate=images`;

    try {
        const res = await axios.get(baseUrl);
        return res.data;
    } catch (error) {
        return { data: [] } // default value
    }
}

export async function getProducts(): Promise<ProductsApiResponse> {
    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?sort=createdAt:desc&pagination[limit]=8&populate=images&populate=category`;

    try {
        const res = await axios.get(baseUrl);
        return res.data;
    } catch (error) {
        return { data: [], meta: { pagination: { start: 1, limit: 8, total: 0 } } }; // Default meta structure
    }
}

export async function getProductsCategories() {
    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories?populate=image`;

    try {
        const res = await fetch(baseUrl, { next: { revalidate: 3600 * 24 * 7 } }); // ISR every week  

        const data = await res.json();
        return data;
    } catch (error) {
        return { data: [] } // Fallback value
    }
}

export async function getProductsStyles() {
    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-styles`;

    try {
        const res = await axios.get(baseUrl);

        return res.data;
    } catch (error) {
        return { data: [] } // default value
    }
}

export async function getProductsMaterials() {
    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-materials`;

    try {
        const res = await axios.get(baseUrl);

        return res.data;
    } catch (error) {
        return { data: [] } // default value
    }
}