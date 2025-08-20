import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import nodemailer from "nodemailer";
import sendOtpEmail from "@/lib/sendOtpEmail";
import sendOtpSms from "@/lib/sendOtpSms";

export async function POST(req: Request) {
  await connectDB();
  try {
    const { email, phone, otpMethod } = await req.json();

    // find user by email or phone
    const user = await User.findOne(
      otpMethod === "email" ? { email } : { phone }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // generate OTP
    // const otp = Math.floor(100000 + Math.random() * 900000).toString();
     const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.otp = otp;
    await user.save();

        if (otpMethod === "email") {
          await sendOtpEmail(email, otp);
        } else if (otpMethod === "phone") {
          await sendOtpSms(phone, otp);
        }

    return NextResponse.json({ message: `OTP sent to your ${otpMethod}` });
  } catch (error) {
    console.error("Login OTP Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
