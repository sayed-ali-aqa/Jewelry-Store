import axios from 'axios';
import { toast } from "sonner"
import { AuthProps } from '@/types/auth';
import { AuthSchema } from '../validations/authValidation';

export const signUpForm = async ({ email, password }: AuthProps): Promise<void> => {
    try {
        // validate with Zod
        AuthSchema.parse({ email, password })

        const response = await axios.post("/api/auth/signup", { email, password });

        if (response.status === 201) {
            toast.success("Signed up successfully!");
        }
    } catch (error: any) {        
        if (error.status === 400) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Failed to sign up");
        }
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
        console.log("error, 12", error);

        if (error.status === 401) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Failed to sign in");
        }
    }
};
