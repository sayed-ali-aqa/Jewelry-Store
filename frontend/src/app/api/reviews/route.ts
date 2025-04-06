import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviews`;

    try {
        const res = await axios.get(baseUrl);
        return NextResponse.json(res.data);
    } catch (error) {
        return NextResponse.json({ data: [], error: "Failed to fetch products reviews" }, { status: 500 });
    }
}