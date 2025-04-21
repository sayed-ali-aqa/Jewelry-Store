import { z } from 'zod';

export const PersonalInfoSchema = z.object({
    firstName: z.string().trim().max(50, "Maximum length is 50 characters").nonempty("First name is required"),
    lastName: z.string().trim().max(50, "Maximum length is 50 characters").nonempty("Last name is required"),
    phone: z.string().trim().max(15, "Maximum length is 15 digits").optional(),
});

export const PersonalInfoUpdateSchema = z.object({
    firstName: z.string().trim().max(50, "Maximum length is 50 characters").nonempty("First name is required"),
    lastName: z.string().trim().max(50, "Maximum length is 50 characters").nonempty("Last name is required"),
    phone: z.string().trim().max(15, "Maximum length is 15 digits").optional(),
    id: z.string().trim(),
});