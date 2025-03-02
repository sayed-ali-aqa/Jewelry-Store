import { ReactNode } from "react";

export interface AuthProps {
    email: string,
    password: string,
}

export interface AuthStateProps {
    user: any | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface LayoutProps {
    children: ReactNode;
}
