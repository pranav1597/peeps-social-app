import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get the token from the request body
    const reqBody = await request.json();
    const { token } = reqBody;

    console.log("resend mail token ", token)

    // Find the user based on the raw token (not hashed)
    const user = await User.findOne({ verifyToken: token });
    console.log("resend mail user ", user);

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token." },
        { status: 400 }
      );
    }

    // Check if the token has expired
    if (Date.now() > user.verifyTokenExpiry) {
      return NextResponse.json(
        { message: "Token has expired." },
        { status: 400 }
      );
    }

    // Resend the verification email
    await sendEmail({
      email: user.email,
      emailType: "VERIFY",
      userId: user._id, // Send the user ID to resend the verification email
    });

    return NextResponse.json(
      { message: "Verification email sent successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error resending verification email:", error);
    return NextResponse.json(
      { message: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
