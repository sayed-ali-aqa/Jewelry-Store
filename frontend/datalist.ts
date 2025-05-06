// Define the protected routes
export const protectedRoutes = [
    "/account/orders",
    "/account/orders/:id",
    "/account/shopping-cart",
    "/account/wishlist",
    "/account/personal-info",
    "/checkout",
    "/success",
    "/canceled",
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
        method: "Free",
        minDuration: 0,
        maxDuration: 0,
        price: 0,
    },
    {
        method: "Standard",
        minDuration: 3,
        maxDuration: 5,
        price: 20,
    },
    {
        method: "Express",
        minDuration: 2,
        maxDuration: 3,
        price: 50,
    },
]

export const taxRate = 5;