import axios from 'axios';
import { toast } from "sonner"
import { CheckoutType } from '@types/allTypes';

export const checkoutForm = async ({ firstName, lastName, phone, email, country, address, city, zipCode, note, shippingMethod, paymentMethod }: CheckoutType): Promise<{ status?: number, error?: string }> => {
    try {
        const authInfoResponse = await fetch("/api/auth/auth-info", { credentials: "include" });
        const {userId, token} = await authInfoResponse.json();

        const response = await axios.post(`/api/checkout`, { firstName, lastName, phone, email, country, address, city, zipCode, note, shippingMethod, paymentMethod, userId, token });

        if (response.status === 200 || response.status === 201) {
            return { status: 200 };
        }
    } catch (error: any) {
        let errorMessage = "Failed to place your order";

        if (error.response?.status === 400) {
            errorMessage = error.response.data.message;
        }

        toast.error(errorMessage);
        return { error: errorMessage }; // Always return an object
    }

    return { error: "Unexpected error occurred" }; // Fallback in case no return happens
}