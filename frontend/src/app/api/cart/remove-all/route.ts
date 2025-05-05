import { NextResponse } from "next/server";
import axios from 'axios';

export async function POST(req: Request) {
    try {
        const { userId, token } = await req.json();

        // Getting cart items
        const cartItemsResponse = await axios.post(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/cart`, { userId, token });
        const cartItems = cartItemsResponse.data?.data || [];

        // If there's an error or the cart is empty
        if (cartItemsResponse.status !== 200 || cartItems.length === 0) {
            return new NextResponse(
                JSON.stringify({ message: "Shopping cart is empty" }),
                { status: 404 }
            );
        }

        // Deleting items from the cart in parallel
        const deletePromises = cartItems.map(item =>
            axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/carts/${item.documentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        );

        // Wait for all delete requests to finish
        const deleteResponses = await Promise.all(deletePromises);

        // Check if all deletions were successful
        const allDeletedSuccessfully = deleteResponses.every(response =>
            response.status === 200 || response.status === 204
        );

        if (allDeletedSuccessfully) {
            return new NextResponse(
                JSON.stringify({
                    message: "Cart items deleted successfully",
                }),
                { status: 200 }
            );
        }

        // If any deletion fails, return 500 error
        return new NextResponse(
            JSON.stringify({ message: "Failed to delete one or more items from the cart" }),
            { status: 500 }
        );

    } catch (error: any) {
        console.log("Error during deletion process:", error);
        
        return new NextResponse(
            JSON.stringify({ message: "An error occurred while processing the request" }),
            { status: 400 }
        );
    }
}
