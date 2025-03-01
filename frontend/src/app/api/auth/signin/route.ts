import { NextResponse } from "next/server";
import axios from 'axios';
import { setTokenCookie } from "../../../../lib/authCookie";

export async function POST(req: Request) {
    const baseUrl = `${process.env.NEXT_SERVER_URL}/api/auth/local`;

    try {
        const { email, password } = await req.json();

        const response = await axios.post(baseUrl, {
            identifier: email,
            password,
        });

        if (response.status === 200) {
            const res = new NextResponse(
                JSON.stringify({ message: "Signed in successfully" }),
                { status: 200 }
            );

            setTokenCookie(res, response.data.jwt);

            return res;
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: "Invalid credentials", error }),
            { status: 401 }
        );
    }
}
