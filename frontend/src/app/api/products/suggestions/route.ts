import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url);  // Extract the query string from the request
    const id = url.searchParams.get("id");  // Get the product ID
    const category = url.searchParams.get("category");  // Get the category

    if (!id || !category) {
        return NextResponse.json({ error: "Missing parameters: id and/or category" }, { status: 400 });
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?sort=createdAt:desc&pagination[limit]=4&filters[id][$ne]=${id}&filters[category][category][$eq]=${category}&populate=images`;

    try {
        const res = await axios.get(baseUrl); 
        return NextResponse.json(res.data.data); 
    } catch (error) {
        console.error("Error fetching data:", error);  // Log the error
        return NextResponse.json({ error: "Failed to fetch suggested products" }, { status: 500 });
    }
}
