import { z } from 'zod';

export const contactRequestSchema = z.object({
    name: z.string().trim().max(50, "Maximum length is 50 chracters").nonempty("Name is required"),
    email: z.string().trim().email("Invalid email format").max(100, "Maximum length is 100 chracters").nonempty("Email is required"),
    title: z.string().trim().max(150, "Maximum length is 150 chracters").nonempty("Title is required"),
    message: z.string().trim().max(700, "Maximum length is 700 chracters").nonempty("Message is required"),
});
