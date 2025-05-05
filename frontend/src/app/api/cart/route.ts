import { NextResponse } from "next/server";
import axios from 'axios';

export async function POST(req: Request) {
    try {
        const { userId, token } = await req.json();

        // getting cart items
        const query = new URLSearchParams({
            'populate[products][populate]': 'images',
            'sort[0]': 'createdAt:desc',
            'filters[users_permissions_user][id][$eq]': userId,
        });

        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/carts?${query.toString()}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            const res = new NextResponse(
                JSON.stringify({
                    data: response?.data?.data || []
                }),
                {
                    status: 200,
                }
            );

            return res;
        }

        // 🚨 If response is not 200
        return new NextResponse(
            JSON.stringify({ message: "Failed to fetch cart items" }),
            { status: response.status || 500 }
        );
    } catch (error: any) {
        console.log("error: ", error);
        

        return new NextResponse(
            JSON.stringify({ message: "Failed to fetch cart items" }),
            { status: 400 }
        );
    }
}
