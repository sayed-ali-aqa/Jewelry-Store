import axios from 'axios';
import { toast } from "sonner"
import { AuthProps } from '@/types/auth';
import { SignUpSchema } from '../validations/authValidation';

const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/local`

export const signUpForm = async ({ email, password }: AuthProps): Promise<void> => {
    try {
        // validate with Zod
        SignUpSchema.parse({ email, password })

        const response = await axios.post(`${baseUrl}/register`, {
            username: email, // Strapi requires username, but we use email instead
            email,
            password,
        })

        console.log(response);
        toast.success("Signed up successfully!");

    } catch (error: any) {
        console.log('An error occurred:', error?.response);
        toast.error("Failed to sign up")
    }
}