import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import sendOtpEmail from "@/lib/sendOtpEmail";   // helper for email OTP
import sendOtpSms from "@/lib/sendOtpSms";       // helper for SMS OTP

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, phone, address, role, email, otpMethod } = await req.json();

    if (!name || !phone || !address || !email || !otpMethod) {
      return NextResponse.json({ error: "All fields are mandatory" }, { status: 400 });
    }

    // Check if user already exists (either phone or email)
    const existingUser = await User.findOne({ 
      $or: [{ email }, { phone }] 
    });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Generate OTP (4–6 digit random number)
    // const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Save user as unverified with OTP
    const user = new User({
      name,
      phone,
      address,
      role,
      email,
      otp,
      otpMethod,
      isVerified: false
    });
    await user.save();

    // Send OTP via selected method
    if (otpMethod === "email") {
      await sendOtpEmail(email, otp);
    } else if (otpMethod === "phone") {
      await sendOtpSms(phone, otp);
    }

    return NextResponse.json({ message: `OTP sent to your ${otpMethod}` });
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
