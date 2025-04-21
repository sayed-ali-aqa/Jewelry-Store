// Define the protected routes
export const protectedRoutes = [
    "/account/orders",
    "/account/shopping-cart",
    "/account/wishlist",
    "/account/personal-info",
    "/checkout",
];

export const accountNavLinks = [
    {
        title: "Cart",
        url: "/account/shopping-cart",
        icon: "ShoppingBag"
    },
    {
        title: "Orders",
        url: "/account/orders",
        icon: "Package"
    },
    {
        title: "Wishlist",
        url: "/account/wishlist",
        icon: "Heart"
    },
    {
        title: "Personal Info",
        url: "/account/personal-info",
        icon: "User"
    },
]

export const weightRanges = [
    [1, 10],
    [11, 20],
    [21, 50],
    [51, 100],
];

export const priceRanges = [
    [10, 100],
    [101, 500],
    [501, 1000],
    [1001, 10000],
];

export const shippingOptions = [
    {
        method: "Standard",
        description: "Delivery in 3 - 5 days",
        price: 20,
    },
    {
        method: "Express",
        description: "Delivery in 2 - 3 days",
        price: 50,
    },
    {
        method: "Free",
        description: "Same day",
        price: 0,
    }
]