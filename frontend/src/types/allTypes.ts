import { ReactNode } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";

export interface SignInProps {
    email: string,
    password: string,
}

export interface SignUpProps {
    firstName: string,
    lastName: string,
    phone?: string,
    email: string,
    password: string,
}

export interface ContactProps {
    name: string,
    email: string,
    title: string,
    message: string,
}

export interface AuthStateProps {
    user: any | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface WishlistStatusProps {
    wishlistStatus: boolean
}

export interface CartStatusProps {
    cartStatus: boolean
}

export interface CartItem {
    quantity: number;
    products: {
        price: number;
        discount: number;
    };
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
    images: { url: string }[],
    alt: string,
    labelText?: string
}

export type AccountItemType = {
    documentId: string,
    quantity: number,
    products: {
        documentId: string,
        name: string,
        slug: string,
        price: number,
        discount: number,
        label: string,
        alt: string,
        images: {
            url: string
        }[]
    }
}

export interface CartQuantitySelectProps {
    id: string,
    currentQuantity: number
}

export interface CartItemCardProps {
    cart: AccountItemType
}

export interface ProductCardProps {
    className?: string,
    product: Product;
}

export interface WishlistCardProps {
    className?: string,
    wishlist: AccountItemType;
}

export interface CartCardProps {
    className?: string,
    cart: AccountItemType;
}

// Because every products request has {data [...]}
export interface ProductsApiResponseWithoutPagination {
    data: Product[];
}

// Because every products request has with pagination
export interface ProductsApiResponse {
    data: Product[];
    meta: {
        pagination: {
            start: number;
            limit: number;
            total: number;
        };
    };
}

export interface Product {
    documentId: string,
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

export interface ProductsResponse {
    data: Product[];
    meta: {
        pagination: {
            start: number;
            limit: number;
            total: number;
        };
    };
}

export interface ProductsListProps {
    initialProducts: ProductsResponse;
}

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

export interface filterRangeValuesCheckBoxProps {
    listItem: number[],
    filterKey: string,
}

export interface CategoryBannerProps {
    productCategories: {
        category: string;
        image: {
            url: string;
        }
    }[];
}

export interface suggestedProductsByCategoryProps {
    id: string,
    category: string
}

export interface Review {
    name: string;
    testimonial: string;
    rating: number;
    image: {
        url: string
    };
};

export interface WishlistIconButtonProps {
    id: string,
    userId?: string,
    token?: string
}

export interface ContactRequestProps {
    name: string,
    email: string,
    title: string,
    message: string,
}

export interface EmptyPlaceholderProps {
    image: string,
    text: string,
    actionText: string,
    clasName?: string,
    imageSize?: number,
    isAction?: boolean,
}

export interface personalInfoType {
    firstName: string,
    lastName: string,
    phone?: string,
}

export interface personalInfoUpdatType extends personalInfoType {
    id: string,
}

export interface AccountPasswordType {
    confirmPassword: string,
    newPassword: string,
    currentPassword: string,
}

export type CheckoutType {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    address: string;
    city: string;
    zipCode: string;
    shippingMethod: string;
    paymentMethod: "Credit" | "Paypal";
    phone?: string;
    note?: string;
}

export interface CheckoutDetailsProps {
    cartData: AccountItemType[]
    cartCount: number,
    cartSubTotal: number,
    totalTax: number,
    totalShippingCost: number
    isSubmitting: boolean,
    isLoading: boolean,
}

export interface ShippingMethodProps {
    errors: FieldErrors<CheckoutType>
    control: Control<CheckoutType>
    setSelectedShippingMethodValue: (value: number) => void
}

export interface DeliveryAddressProps {
    register: UseFormRegister<CheckoutType>
    errors: FieldErrors<CheckoutType>
}

export type OrderItem = {
    product: {
        name: string,
        images: {
            url: string
        }[]
    }
}

export interface orderProps {
    documentId: string,
    createdAt: string,
    orderStatus: string,
    total: number,
    totalShippingCost?: number,
    tax?: number,
    order_items: OrderItem[],
    country?: string,
    city?: string,
    zipCode?: string,
    address?: string,
    paymentMethod?: string,
    shippingMethod?: string,
}

export interface OrderGeneralDetailsProps {
    orderNo: string,
    orderDate: string,
    orderStatus: string,
    total: number
}
