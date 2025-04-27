import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { userId, token } = await req.json();

        const query = new URLSearchParams({
            'populate[products][populate]': 'images',
            'sort[0]': 'createdAt:desc',
            'filters[users_permissions_user][id][$eq]': userId,
        });

        const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/carts?${query.toString()}`;

        const res = await axios.get(baseUrl, {
            headers: {
                Authorization: `Bearer ${token}`, // Auth token
            },
        });

        return NextResponse.json(res.data);
    } catch (error) {
        return NextResponse.json({ data: [], error: "Failed to fetch cart items" }, { status: 500 });
    }
}