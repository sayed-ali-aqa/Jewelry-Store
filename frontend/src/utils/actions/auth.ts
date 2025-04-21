import axios from 'axios';
import { toast } from "sonner"
import { SignInProps, SignUpProps } from '@/types/auth';

export const signUpForm = async ({ firstName, lastName, phone, email, password }: SignUpProps): Promise<{ user?: string; status?: number, error?: string }> => {
    try {
        // 1. create the username, email, and password and return the user data
        const response = await axios.post("/api/auth/signup", { firstName, lastName, phone, email, password });

        if (response.status === 200) {
            const token = response.data.data.jwt
            const userId = response.data.data.user.id

            // 2. Then add firstname, lastname, and phone
            const personalInfoRes = await axios.post("/api/account/personal-info", { firstName, lastName, phone, userId: userId, token: token });

            if (personalInfoRes.status === 200) {
                toast.success("Account created successfully!");

                return { status: 200, user: response.data.data.user || null };
            }
        }
    } catch (error: any) {
        let errorMessage = "Failed to create account";

        if (error.response?.status === 400) {
            errorMessage = error.response.data.message;
        }

        toast.error(errorMessage);
        return { error: errorMessage }; // Always return an object
    }

    return { error: "Unexpected error occurred" }; // Fallback in case no return happens
}

export const signInForm = async ({ email, password }: SignInProps): Promise<{ user?: string; status?: number, error?: string }> => {
    try {
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
