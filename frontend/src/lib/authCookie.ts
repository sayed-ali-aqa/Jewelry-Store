import { NextResponse } from "next/server";

export function setTokenCookie(res: NextResponse, token: string) {
    // Set HTTP-only cookie
    res.cookies.set({
        name: "token",
        value: token,
        httpOnly: true, // Cannot be accessed via JavaScript
        secure: process.env.NODE_ENV === "production", // Use HTTPS in production
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/", // Accessible across the entire site
        sameSite: "strict", // Prevent CSRF attacks
    });
}

export function setUserId(res: NextResponse, userId: string) {
    // Set HTTP-only cookie
    res.cookies.set({
        name: "userId",
        value: userId,
        httpOnly: true, // Cannot be accessed via JavaScript
        secure: process.env.NODE_ENV === "production", // Use HTTPS in production
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/", // Accessible across the entire site
        sameSite: "strict", // Prevent CSRF attacks
    });
}

export function clearTokenCookie(res: NextResponse) {
    res.cookies.set({
        name: "token",
        value: "",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 0, // Expire immediately
        path: "/",
        sameSite: "strict",
    });

    res.cookies.set({
        name: "userId",
        value: "",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
        path: "/",
        sameSite: "strict",
    });
}