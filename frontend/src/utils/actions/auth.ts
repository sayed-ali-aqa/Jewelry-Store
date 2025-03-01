import axios from 'axios';
import { toast } from "sonner"
import { AuthProps } from '@/types/auth';
import { AuthSchema } from '../validations/authValidation';
import { setTokenCookie } from '../../lib/authCookie';

const baseUrl = `${process.env.NEXT_SERVER_URL}/api/auth/local`

export const signUpForm = async ({ email, password }: AuthProps): Promise<void> => {
    try {
        // validate with Zod
        AuthSchema.parse({ email, password })

        const response = await axios.post(`${baseUrl}/register`, {
            username: email, // Strapi requires username, but we use email instead
            email,
            password,
        })

        if (response.status === 200) {
            toast.success("Signed up successfully!");
        }
    } catch (error: any) {
        toast.error("Failed to sign up")
    }
}

export const signInForm = async ({ email, password }: AuthProps): Promise<void> => {
    try {
        AuthSchema.parse({ email, password });

        const response = await axios.post("/api/auth/signin", { email, password });

        if (response.status === 200) {
            toast.success("Signed in successfully!");
        }
    } catch (error: any) {
        if (error.status === 401) {
            toast.error("Invalid email or password");
        } else {
            toast.error("Failed to sign in");
        }
    }
};
