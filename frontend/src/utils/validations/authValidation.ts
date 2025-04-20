import { z } from 'zod';

export const SignInSchema = z.object({
    email: z.string().email("Invalid email format").nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
});

export const SignUpSchema = z.object({
    firstName: z.string().trim().max(50, "Maximum length is 50 characters").nonempty("First name is required"),
    lastName: z.string().trim().max(50, "Maximum length is 50 characters").nonempty("Last name is required"),
    phone: z.string().trim().max(15, "Maximum length is 15 digits").optional(),
    email: z.string().email("Invalid email format").nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
});

