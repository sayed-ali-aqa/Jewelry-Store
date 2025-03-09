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

export interface ProductsProps {
    current: string,
    visitedLinks: { title: string, link: string }[]
}

export interface ProductLableProps {
    label: string,
    className?: string
}

export interface ProductImagesProps {
    images: string[],
    alt: string,
    labelText?: string
}