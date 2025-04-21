import axios from 'axios';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user-infos`;
    const {id} = await params;

    try {
        const { firstName, lastName, phone, token } = await req.json();

        const response = await axios.put(`${baseUrl}/${id}`, {
            data: {
                firstName,
                lastName,
                phone,
            },
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return new NextResponse(
                JSON.stringify({ message: "Personal info updated successfully" }),
                { status: 200 }
            );
        }

        return new NextResponse(
            JSON.stringify({ message: "Failed to update personal info" }),
            { status: response.status || 500 }
        );

    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({ message: error?.response?.data?.message || "Failed to update personal info" }),
            { status: 400 }
        );
    }
}
