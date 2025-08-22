import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function GET(req: Request) {
  await connectDB();
  const token = req.headers.get("cookie")?.split("token=")[1];
  if (!token) return NextResponse.json({ user: null });

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    return NextResponse.json({ user,token });
  } catch {
    return NextResponse.json({ user: null });
  }
}
