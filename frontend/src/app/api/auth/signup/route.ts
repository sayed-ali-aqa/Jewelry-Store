import { NextResponse } from "next/server";
import axios from 'axios';
import { setTokenCookie, setUserId } from "../../../../lib/authCookie";

export async function POST(req: Request) {
    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/local/register`;

    try {
        const { email, password } = await req.json();

        const response = await axios.post(baseUrl, {
            username: email,
            email,
            password,
        });

        if (response.status === 201 || response.status === 200) {
            const res = new NextResponse(
                JSON.stringify({
                    message: "Account created successfully",
                    data: response.data,
                }),
                {
                    status: 200,
                }
            );

            setTokenCookie(res, response.data.jwt);
            setUserId(res, response.data.user.id);

            return res;
        }

        // 🚨 If response is not 200
        return new NextResponse(
            JSON.stringify({ message: "Unexpected error occurred" }),
            { status: response.status || 500 }
        );

    } catch (error: any) {
        console.log("error: ", error);


        if (
            error.response?.data?.error?.status === 400 ||
            error.response?.data?.error?.message?.includes("Email or Username are already taken")
        ) {
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
