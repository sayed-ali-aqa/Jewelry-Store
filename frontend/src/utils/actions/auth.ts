import axios from 'axios';
import { toast } from "sonner"
import { AuthProps } from '@/types/auth';
import { AuthSchema } from '../validations/authValidation';

export const signUpForm = async ({ email, password }: AuthProps): Promise<{ user?: string; status?: number, error?: string }> => {
    try {
        // validate with Zod
        AuthSchema.parse({ email, password })

        const response = await axios.post("/api/auth/signup", { email, password });

        if (response.status === 201) {
            toast.success("Signed up successfully!");

            return { status: 201, user: response.data.user || null };
        }
    } catch (error: any) {
        let errorMessage = "Failed to sign up";

        if (error.response?.status === 400) {
            errorMessage = error.response.data.message;
        }

        toast.error(errorMessage);
        return { error: errorMessage }; // Always return an object
    }

    return { error: "Unexpected error occurred" }; // Fallback in case no return happens
}

export const signInForm = async ({ email, password }: AuthProps): Promise<{ user?: string; status?: number, error?: string }> => {
    try {
        AuthSchema.parse({ email, password });

        const response = await axios.post("/api/auth/signin", { email, password });

        if (response.status === 200) {
            toast.success("Signed in successfully!");

            return { status: 200, user: response.data.user || null };
        }
    } catch (error: any) {
        let errorMessage = "Failed to sign in";

        if (error.response?.status === 401) {
            errorMessage = error.response.data.message;
        }

        toast.error(errorMessage);
        return { error: errorMessage }; // Always return an object
    }

    return { error: "Unexpected error occurred" }; // Fallback in case no return happens
};
