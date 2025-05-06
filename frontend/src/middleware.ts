import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { protectedRoutes } from "../datalist";

// Helper: Match dynamic route patterns like /account/orders/:id
const matchRoute = (pattern: string, path: string) => {
    const regex = new RegExp("^" + pattern.replace(/:[^/]+/g, "[^/]+") + "$");
    return regex.test(path);
};

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const userId = req.cookies.get("userId")?.value;
    const { pathname } = req.nextUrl;

    const isProtected = protectedRoutes.some(route => matchRoute(route, pathname));

    if ((!userId || !token) && isProtected) {
        return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/:path*",
};
