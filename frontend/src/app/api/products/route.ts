import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?sort=createdAt:desc&pagination[limit]=6&populate=images`;

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";

    try {
        let url = baseUrl;
        if (search) {
            url += `&filters[name][$contains]=${search}`;
        }

        const res = await axios.get(url);
        return NextResponse.json(res.data);
    } catch (error) {
        return NextResponse.json({ data: [], error: "Failed to fetch products" }, { status: 500 });
    }
}
