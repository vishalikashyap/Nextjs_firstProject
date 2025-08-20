import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, phone, otp, otpMethod } = await req.json();

    if (!otp || !otpMethod) {
      return NextResponse.json({ error: "OTP and method required" }, { status: 400 });
    }

    // Find user with given OTP
    const user = await User.findOne(
      otpMethod === "email" ? { email } : { phone }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = null; // clear OTP
    await user.save();

    return NextResponse.json({ message: "User verified successfully" });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
