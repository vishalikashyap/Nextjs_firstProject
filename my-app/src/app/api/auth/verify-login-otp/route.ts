import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function POST(req: Request) {
  await connectDB();
  const { email, phone, otp, otpMethod } = await req.json();

  try {
    const user =
      otpMethod === "email"
        ? await User.findOne({ email })
        : await User.findOne({ phone });

    if (!user || user.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
    }

    // OTP verified → clear OTP and login
    user.otp = null;
    user.isVerified = true;
    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    const res = NextResponse.json({ message: "Login successful" });
    res.cookies.set("token", token, { httpOnly: true });
    return res;
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
