// ----------------- This is a utility file where you write reusable API-fetching functions ------------------

import { ProductsApiResponse } from "@types/allTypes";

// Fetching data inside a Server Component
export async function getNewProducts(): Promise<ProductsApiResponse> {
    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?sort=createdAt:desc&pagination[limit]=6&populate=images`;

    const res = await fetch(baseUrl, {
        next: { revalidate: 86400 }, // Enables ISR (Revalidate every 24 hours)
    });

    return res.json();
}