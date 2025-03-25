// ----------------- This is a utility file where you write reusable API-fetching functions ------------------

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
    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories`;

    try {
        const res = await axios.get(baseUrl);  

        return res.data;
    } catch (error) {
        return { data: [] } // default value
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