// API Route with ISR
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?sort=createdAt:desc&pagination[limit]=8&populate=images`;

    try {
        const res = await fetch(baseUrl, { next: { revalidate: 60 * 60 * 6 } }); // revalidate every 6 hours
        const data = await res.json();
        return NextResponse.json(data.data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch suggested products" }, { status: 500 });
    }
}
