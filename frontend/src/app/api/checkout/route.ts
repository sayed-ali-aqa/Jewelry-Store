import { NextResponse } from "next/server";
import axios from 'axios';

export async function POST(req: Request) {
    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user-infos`;

    try {
        const { firstName, lastName, phone, email, country, address, city, zipCode, note, shippingMethod, paymentMethod, userId, token } = await req.json();

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
                userId,
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
                    message: "Personal info added successfully",
                }),
                {
                    status: 200,
                }
            );

            return res;
        }

        // 🚨 If response is not 200
        return new NextResponse(
            JSON.stringify({ message: "Failed to add personal info" }),
            { status: response.status || 500 }
        );
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({ message: "Failed to add personal info" }),
            { status: 400 }
        );
    }
}
