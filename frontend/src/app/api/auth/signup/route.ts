import { NextResponse } from "next/server";
import axios from 'axios';
import { setTokenCookie } from "../../../../lib/authCookie";

export async function POST(req: Request) {
    const baseUrl = `${process.env.SERVER_URL}/api/auth/local/register`;

    try {
        const { email, password } = await req.json();

        const response = await axios.post(baseUrl, {
            username: email,
            email,
            password,
        });

        if (response.status === 200 || response.status === 201) {
            const res = new NextResponse(
                JSON.stringify({
                    message: "Signed up successfully",
                    user: response.data.user,
                }),
                {
                    status: 201,
                }
            );

            setTokenCookie(res, response.data.jwt);

            return res;
        }
    } catch (error: any) {
        // Check if the error is related to the email already being taken
        if (error.response?.data?.error?.status === 400 || error.response?.data?.error?.message.includes("Email or Username are already taken")) {
            return new NextResponse(
                JSON.stringify({ message: "Email already taken" }),
                { status: 400 }
            );
        }

        return new NextResponse(
            JSON.stringify({ message: "Failed to create account" }),
            { status: 400 }
        );
    }
}
