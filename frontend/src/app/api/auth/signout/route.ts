import { NextResponse } from "next/server";
import { clearTokenCookie } from "../../../../lib/authCookie";

export async function POST(req: Request) {
    const res = NextResponse.json({ message: "Signed out" });
    clearTokenCookie(res);
    return res;
}
