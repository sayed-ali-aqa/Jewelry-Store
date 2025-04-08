// Define the protected routes
export const protectedRoutes = [
    "/account/personal-info"
];

export const accountNavLinks = [
    {
        title: "Cart",
        url: "/account/cart",
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
