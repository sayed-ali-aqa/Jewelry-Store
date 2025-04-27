import axios from 'axios';
import { toast } from "sonner"
import { CheckoutType } from '@types/allTypes';

export const checkoutForm = async ({ firstName, lastName, phone, email, country, address, city, zipCode, note, shippingMethod, paymentMethod }: CheckoutType): Promise<{ status?: number, error?: string, id?: number }> => {
    try {
        const authInfoResponse = await fetch("/api/auth/auth-info", { credentials: "include" });
        const { userId, token } = await authInfoResponse.json();

        // 1. create an order
        const response = await axios.post(`/api/checkout/orders`, { firstName, lastName, phone, email, country, address, city, zipCode, note, shippingMethod, paymentMethod, userId, token });
        
        if (response.status === 200 || response.status === 201) {
            // 2. isnert order items
            const OrderItemsResponse = await axios.post(`/api/checkout/order-items`, {  orderId: response.data.id, userId, token });
            console.log("OrderItemsResponse: ", OrderItemsResponse);
        }

        return { status: 200 };
    } catch (error: any) {
        let errorMessage = "Failed to place order";

        if (error.response?.status === 400) {
            errorMessage = error.response.data.message;
        }

        toast.error(errorMessage);
        return { error: errorMessage }; // Always return an object
    }

    return { error: "Unexpected error occurred" }; // Fallback in case no return happens
}