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
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#0B0C10" }}>
      <div className="p-8 rounded-2xl shadow-lg w-full max-w-md" style={{ backgroundColor: "#1F2833" }}>
        <h1 className="text-2xl font-bold text-center mb-6" style={{ color: "#C5C6C7" }}>
          {step === "choose"
            ? "Login Method "
            : step === "login"
            ? `Login with ${otpMethod === "email" ? "Email " : "Phone"}`
            : "Enter OTP "}
        </h1>

        {step === "choose" && (
          <div className="space-y-4">
            <button
              onClick={() => handleChooseMethod("email")}
              className="w-full py-2 rounded-lg font-medium"
              style={{ backgroundColor: "#66FCF1", color: "#0B0C10" }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#45A29E")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#66FCF1")}
            >
              Login with Email
            </button>
            <button
              onClick={() => handleChooseMethod("phone")}
              className="w-full py-2 rounded-lg font-medium"
              style={{ backgroundColor: "#66FCF1", color: "#0B0C10" }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#45A29E")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#66FCF1")}
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
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg"
                style={{ backgroundColor: "#0B0C10", color: "#C5C6C7", border: "1px solid #45A29E" }}
              />
            )}
            {otpMethod === "phone" && (
              <input
                type="tel"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 rounded-lg"
                style={{ backgroundColor: "#0B0C10", color: "#C5C6C7", border: "1px solid #45A29E" }}
              />
            )}

            <button
              onClick={handleSendOtp}
              className="w-full py-2 rounded-lg font-medium"
              style={{ backgroundColor: "#66FCF1", color: "#0B0C10" }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#45A29E")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#66FCF1")}
            >
              Send OTP
            </button>

            <button
              onClick={() => setStep("choose")}
              className="w-full text-sm underline"
              style={{ color: "#C5C6C7" }}
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
              className="w-full px-4 py-2 rounded-lg"
              style={{ backgroundColor: "#0B0C10", color: "#C5C6C7", border: "1px solid #45A29E" }}
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full py-2 rounded-lg font-medium"
              style={{ backgroundColor: "#66FCF1", color: "#0B0C10" }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#45A29E")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#66FCF1")}
            >
              Verify OTP & Login
            </button>
          </div>
        )}

        {step !== "verify" && (
          <div className="mt-6 text-center text-sm" style={{ color: "#C5C6C7" }}>
            Don’t have an account?{" "}
            <a href="/signup" style={{ color: "#66FCF1" }}>
              Sign up
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
