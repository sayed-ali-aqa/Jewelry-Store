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

export const AccountPasswordSchema = z
    .object({
        currentPassword: z
            .string()
            .min(6, "Current password must be at least 6 characters")
            .nonempty("Current password is required"),

        newPassword: z
            .string()
            .min(6, "New password must be at least 6 characters")
            .nonempty("New password is required"),

        confirmPassword: z
            .string()
            .min(6, "Confirm password must be at least 6 characters")
            .nonempty("Confirm password is required"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });
