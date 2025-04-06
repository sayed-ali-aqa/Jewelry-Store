import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    // Await the cookies() function
    const cookieStore = await cookies();
    
    // Get the token & userId from HttpOnly cookies
    const token = cookieStore.get("token")?.value;
    const userId = cookieStore.get("userId")?.value;

    return NextResponse.json({ token, userId });
}
