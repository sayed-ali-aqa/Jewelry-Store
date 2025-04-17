import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { protectedRoutes } from "../datalist";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value; // Get the JWT from cookies
    const userId = req.cookies.get("userId")?.value; // Get the JWT from cookies
    const { pathname } = req.nextUrl;

    // If the user is NOT logged in and tries to access a protected route, redirect to login
    if ((!userId || !token) && protectedRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }

    // Allow the request if the user is authenticated or accessing public routes
    return NextResponse.next();
}

// Apply the middleware to all routes
export const config = {
    matcher: "/:path*", // Apply middleware to all pages
};
