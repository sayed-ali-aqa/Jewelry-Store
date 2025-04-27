import { z } from "zod";
import { shippingOptions } from "../../../datalist";

const shippingMethodEnum = z.enum(
    shippingOptions.map(option => option.method) as [string, ...string[]], 
    {
        errorMap: () => ({
            message: `Shipping method must be one of: ${shippingOptions.map(opt => opt.method).join(', ')}`,
        }),
    }
);

export const CheckoutSchema = z.object({
    firstName: z.string().trim().max(50, "Maximum length is 50 characters").nonempty("First name is required"),
    lastName: z.string().trim().max(50, "Maximum length is 50 characters").nonempty("Last name is required"),
    phone: z.string().trim().max(15, "Maximum length is 15 digits").optional(),
    email: z.string().email("Invalid email format").nonempty("Email is required"),
    country: z.string().trim().max(150, "Maximum length is 150 characters").nonempty("Country is required"),
    address: z.string().trim().max(250, "Maximum length is 250 characters").nonempty("Address is required"),
    city: z.string().trim().max(150, "Maximum length is 150 characters").nonempty("City is required"),
    zipCode: z.string().trim().max(6, "Maximum length is 6 characters").nonempty("Zip code is required"),
    note: z.string().trim().max(300, "Maximum length is 300 characters").optional(),
    shippingMethod: shippingMethodEnum,
    paymentMethod: z.enum(['Credit', 'Paypal'], {
        errorMap: () => ({ message: 'Payment method must be either Credit or PayPal' }),
    }),
});

