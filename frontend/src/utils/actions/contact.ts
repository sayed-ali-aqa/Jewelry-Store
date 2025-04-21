import axios from 'axios';
import { toast } from "sonner"
import { ContactProps } from '@/types/auth';

export const contactForm = async ({ name, email, title, message }: ContactProps): Promise<{ status?: number, error?: string }> => {
    try {
        const response = await axios.post("/api/contact", { name, email, title, message });

        if (response.status === 201) {
            return { status: 201 };
        }
    } catch (error: any) {
        let errorMessage = "Failed to submit contact";

        if (error.response?.status === 400) {
            errorMessage = error.response.data.message;
        }

        toast.error(errorMessage);
        return { error: errorMessage }; // Always return an object
    }

    return { error: "Unexpected error occurred" }; // Fallback in case no return happens
}