import axios from 'axios';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`;
    const { id } = params;

    try {
        const token = process.env.STRAPI_API_TOKEN;

        const response = await axios.put(`${baseUrl}/${id}`, {
            data: {
                orderStatus: "Paid"
            },
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return NextResponse.json(
                { message: "Order status updated successfully" },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { message: "Failed to update order status" },
            { status: response.status || 500 }
        );

    } catch (error: any) {
        return NextResponse.json(
            { message: error?.response?.data?.message || "Failed to update order status" },
            { status: 400 }
        );
    }
}
