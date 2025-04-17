import { NextResponse } from "next/server";
import axios from 'axios';

export async function POST(req: Request) {
    const baseUrl = `http://localhost:1337/api/user-infos`;

    try {
        const { firstName, lastName, phone, userId, token } = await req.json();

        const data = {
            data: {
                firstName: firstName,
                lastName: lastName,
                phone: phone,
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
                    message: "Personal info updated successfully",
                }),
                {
                    status: 200,
                }
            );

            return res;
        } else {
            return new NextResponse(
                JSON.stringify({ message: "Failed to update personal info" }),
                { status: 400 }
            );
        }
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({ message: "Failed to update personal info" }),
            { status: 400 }
        );
    }
}
