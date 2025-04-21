import axios from 'axios';
import { toast } from "sonner"
import { AccountPasswordType, personalInfoUpdatType } from '@types/allTypes';

export const PersonalInfoForm = async ({ firstName, lastName, phone, id }: personalInfoUpdatType): Promise<{ status?: number, error?: string }> => {
    try {
        const authInfoResponse = await fetch("/api/auth/auth-info", { credentials: "include" });
        const authInfo = await authInfoResponse.json();

        const response = await axios.put(`/api/account/personal-info/${id}`, { firstName, lastName, phone, token: authInfo.token });

        if (response.status === 200 || response.status === 201) {
            return { status: 200 };
        }
    } catch (error: any) {
        let errorMessage = "Failed to update personal info";

        if (error.response?.status === 400) {
            errorMessage = error.response.data.message;
        }

        toast.error(errorMessage);
        return { error: errorMessage }; // Always return an object
    }

    return { error: "Unexpected error occurred" }; // Fallback in case no return happens
}

export const ChangeAccountPassword = async ({ currentPassword, newPassword, confirmPassword }: AccountPasswordType): Promise<{ status?: number, error?: string }> => {
    try {
        const authInfoResponse = await fetch("/api/auth/auth-info", { credentials: "include" });
        const { token } = await authInfoResponse.json();

        const response = await axios.post(`/api/auth/change-password`, { currentPassword, newPassword, confirmPassword, token: token });

        if (response.status === 200 || response.status === 201) {
            return { status: 200 };
        }
    } catch (error: any) {
        let errorMessage = "Failed to update password";
        let statusCode;

        if (error.response?.status === 400) {
            errorMessage = "Current password is incorrect";
            statusCode = 400;
        }

        return { status: statusCode || 500, error: errorMessage }; // Always return an object
    }

    return { error: "Unexpected error occurred" }; // Fallback in case no return happens
}