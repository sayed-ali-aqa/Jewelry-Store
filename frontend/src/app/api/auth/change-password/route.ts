import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { currentPassword, newPassword, confirmPassword, token } = await req.json();

    // Validate that new password and confirmation match
    if (newPassword !== confirmPassword) {
      return new NextResponse(
        JSON.stringify({ message: "New password and confirmation do not match." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Send request to Strapi's change-password endpoint
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/change-password`,
      {
        currentPassword: currentPassword,
        password: newPassword,
        passwordConfirmation: confirmPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return new NextResponse(
      JSON.stringify({ message: "Password changed successfully." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || "Failed to change password.";
    return new NextResponse(
      JSON.stringify({ message: errorMessage }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}
