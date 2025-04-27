import { NextResponse } from "next/server";
import axios from 'axios';
import { getShippingMethodValue } from "@utils/functions/checkout";
import { calculateCartTotalAfterDiscount, calculateNumOfCartItems, calculateTotalTax } from "@utils/functions/calculate";

export async function POST(req: Request) {
    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`;

    try {
        const { firstName, lastName, phone, email, country, address, city, zipCode, note, shippingMethod, paymentMethod, userId, token } = await req.json();

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

        // calculating total shipping cost
        const unitShippingCost = getShippingMethodValue(shippingMethod)
        const totalCartCount = calculateNumOfCartItems(cartItems)
        const totalShippingCost = unitShippingCost * totalCartCount;

        // calculate total tax
        const subtotal = calculateCartTotalAfterDiscount(cartItems)
        const totalTax = calculateTotalTax(subtotal, totalShippingCost);

        const data = {
            data: {
                firstName,
                lastName,
                email,
                phone,
                country,
                address,
                city,
                zipCode,
                note,
                shippingMethod,
                paymentMethod,
                stripePaymentIntentId: "Stripe001",
                paypalOrderId: "Paypal001",
                totalShippingCost: (totalShippingCost).toFixed(2),
                tax: (totalTax).toFixed(2),
                total: (subtotal + totalTax + totalShippingCost).toFixed(2),
                users_permissions_user: userId,
            },
        }

        const response = await axios.post(baseUrl, data, {
            headers: {
                Authorization: `Bearer ${token}`, // Auth token
            },
        });

        if (response.status === 201 || response.status === 200) {
            const res = new NextResponse(
                JSON.stringify({
                    message: "Order placed successfully",
                }),
                {
                    status: 200,
                }
            );

            return res;
        }

        // 🚨 If response is not 200
        return new NextResponse(
            JSON.stringify({ message: "Failed to place order" }),
            { status: response.status || 500 }
        );
    } catch (error: any) {
        console.log(error);


        return new NextResponse(
            JSON.stringify({ message: "Failed to place order" }),
            { status: 400 }
        );
    }
}
