import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });
  res.cookies.set("token", "", { httpOnly: true, maxAge: 0 });
  return res;
}
