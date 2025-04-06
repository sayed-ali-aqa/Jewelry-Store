import { NextResponse } from "next/server";
import axios from 'axios';

export async function POST(req: Request) {
    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/contact-requests`;

    try {
        const { name, email, title, message } = await req.json();

        const response = await axios.post(baseUrl, {
            "data": {
                name: name,
                email: email,
                title: title,
                message: message
            }
        });

        if (response.status === 201) {
            const res = new NextResponse(
                JSON.stringify({
                    message: "Contact submitted successfully",
                }),
                {
                    status: 201,
                }
            );

            return res;
        }
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({ message: "Failed to submit contact" }),
            { status: 400 }
        );
    }
}
