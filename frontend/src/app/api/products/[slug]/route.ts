import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    const { slug } = params;
    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?filters[slug][$contains]=${slug}&populate=images&populate=category&populate=style&populate=material`;

    try {
        const res = await axios.get(baseUrl);
        return NextResponse.json(res.data?.data);
    } catch (error) {
        return NextResponse.json({ data: {}, error: "Failed to fetch product" }, { status: 500 });
    }
}