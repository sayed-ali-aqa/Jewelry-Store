import { NextResponse } from "next/server";
import axios from 'axios';
import { calculateItemPriceAfterDiscount } from "@utils/functions/calculate";

export async function POST(req: Request) {
    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/order-items`;

    try {
        const { orderId, userId, token } = await req.json();

        // getting cart items
        const query = new URLSearchParams({
            'populate[products][populate]': 'images',
            'sort[0]': 'createdAt:desc',
            'filters[users_permissions_user][id][$eq]': userId,
        });

        const cartItemsResponse = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/carts?${query.toString()}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const cartItems = cartItemsResponse?.data?.data || [];

        // if there is error or cart is empty
        if (cartItemsResponse.status !== 200 || cartItems.length === 0) {
            return new NextResponse(
                JSON.stringify({ message: "Shopping cart is empty" }),
                { status: 404 }
            );
        }

        for (const item of cartItems) {
            const unitPrice = calculateItemPriceAfterDiscount(item.products.price, item.products.discount)

            const data = {
                data: {
                    product: item?.products?.documentId,
                    quantity: item?.quantity,
                    unitPrice: (unitPrice).toFixed(2),
                    order: orderId,
                },
            };

            await axios.post(baseUrl, data, {
                headers: {
                    Authorization: `Bearer ${token}`, // Auth token
                },
            });
        }

        const res = new NextResponse(
            JSON.stringify({
                message: "Order placed successfully",
            }),
            {
                status: 200,
            }
        );

        return res;
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({ message: "Failed to place order" }),
            { status: 400 }
        );
    }
}
