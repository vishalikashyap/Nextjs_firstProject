"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [step, setStep] = useState<"choose" | "login" | "verify">("choose");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpMethod, setOtpMethod] = useState<"email" | "phone" | null>(null);

  const router = useRouter();

  const handleChooseMethod = (method: "email" | "phone") => {
    setOtpMethod(method);
    setStep("login");
  };

  const handleSendOtp = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, phone, otpMethod }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert(`OTP sent to your ${otpMethod}!`);
      setStep("verify");
    } else {
      alert("User not found or error occurred");
    }
  };

  const handleVerifyOtp = async () => {
    const res = await fetch("/api/auth/verify-login-otp", {
      method: "POST",
      body: JSON.stringify({ email, phone, otp, otpMethod }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("Login successful!");
      router.push("/dashboard");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div className="relative z-10 p-8 rounded-2xl shadow-2xl w-full max-w-md bg-[#1F2833]/90 border border-[#45A29E]/40">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#66FCF1] tracking-wide">
          {step === "choose"
            ? "Welcome Back!"
            : step === "login"
            ? `Login with ${otpMethod === "email" ? "Email" : "Phone"}`
            : "Verify OTP"}
        </h1>

        {step === "choose" && (
          <div className="space-y-4">
            <button
              onClick={() => handleChooseMethod("email")}
              className="w-full py-3 rounded-xl font-semibold bg-[#66FCF1] text-[#0B0C10] hover:bg-[#45A29E] transition"
            >
              Login with Email
            </button>
            <button
              onClick={() => handleChooseMethod("phone")}
              className="w-full py-3 rounded-xl font-semibold bg-[#66FCF1] text-[#0B0C10] hover:bg-[#45A29E] transition"
            >
              Login with Phone
            </button>
          </div>
        )}

        {step === "login" && (
          <div className="space-y-4">
            {otpMethod === "email" && (
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#0B0C10] text-[#C5C6C7] border border-[#45A29E]/60 focus:outline-none focus:ring-2 focus:ring-[#66FCF1]"
              />
            )}
            {otpMethod === "phone" && (
              <input
                type="tel"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#0B0C10] text-[#C5C6C7] border border-[#45A29E]/60 focus:outline-none focus:ring-2 focus:ring-[#66FCF1]"
              />
            )}

            <button
              onClick={handleSendOtp}
              className="w-full py-3 rounded-xl font-semibold bg-[#66FCF1] text-[#0B0C10] hover:bg-[#45A29E] transition"
            >
              Send OTP
            </button>

            <button
              onClick={() => setStep("choose")}
              className="w-full text-sm underline text-[#C5C6C7] hover:text-[#66FCF1] transition"
            >
              ← Back
            </button>
          </div>
        )}

        {step === "verify" && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#0B0C10] text-[#C5C6C7] border border-[#45A29E]/60 focus:outline-none focus:ring-2 focus:ring-[#66FCF1]"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full py-3 rounded-xl font-semibold bg-[#66FCF1] text-[#0B0C10] hover:bg-[#45A29E] transition"
            >
              Verify OTP & Login
            </button>
          </div>
        )}

        {step !== "verify" && (
          <div className="mt-6 text-center text-sm text-[#C5C6C7]">
            Don’t have an account?{" "}
            <a href="/signup" className="text-[#66FCF1] hover:underline">
              Sign up
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
