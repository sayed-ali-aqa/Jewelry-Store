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
            await axios.post(`/api/checkout/order-items`, { orderId: response.data.id, userId, token });

            // 3. make stripe payment
            // const res = await fetch('/api/checkout/payment-intents/stripe', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({  orderId: response.data.id, shippingMethod, email, userId, token }),
            // })

            // const data = await res.json()

            // if (data.url) {
            //     window.location.href = data.url // Force full-page redirect
            // }


            const res = await fetch('/api/checkout/payment-intents/paypal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: response.data.id, shippingMethod, email, userId, token }),
            })

            console.log("res: ", res);

            const data = await res.json();
            const approvalUrl = data.links.find((link: any) => link.rel === 'approve')?.href;

            if (approvalUrl) {
                window.location.href = approvalUrl;
            }
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
}