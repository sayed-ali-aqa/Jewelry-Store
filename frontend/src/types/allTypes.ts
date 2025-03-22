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

export interface ProductCardProps {
    className?: string,
    product: Product;
}

// Because every products request has {data [...]}
export interface ProductsApiResponse {
    data: Product[];
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    discount: number;
    quantity: number;
    label: string;
    primary_material: string;
    secondary_material?: string;
    weight: number;
    style: string;
    description: { type: string; children: { type: string; text: string }[] }[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    alt: string;
    images: { url: string }[];
};

export interface CategoryProps {
    category: string;
}

export interface StyleProps {
    style: string;
}

export interface MaterialProps {
    material: string;
}

export interface filterCheckBoxProps {
    listItem: string,
    filterKey: string,
}