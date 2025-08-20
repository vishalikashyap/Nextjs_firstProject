"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [step, setStep] = useState<"signup" | "verify">("signup");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpMethod, setOtpMethod] = useState<"email" | "phone">("email");

  const router = useRouter();

  const handleSignup = async () => {
    if (!name || !phone || !email || !address) {
      alert("All fields are mandatory!");
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, phone, address, role, email, otpMethod }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert(`OTP sent to your ${otpMethod}!`);
      setStep("verify");
    } else {
      alert("Signup failed. Try again.");
    }
  };

  const handleVerifyOtp = async () => {
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, phone, otp, otpMethod }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("Signup successful!");
      router.push("/dashboard");
    } else {
      alert("Invalid OTP. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0B0C10]">
      <div className="bg-[#1F2833] p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#45A29E]">
        <h1 className="text-3xl font-extrabold text-center mb-2 text-[#66FCF1]">
          {step === "signup" ? "Join LearnWithUs" : "Verify Your OTP"}
        </h1>
       <div className="text-3xl font-extrabold text-center mb-6 text-[#66FCF1]">
          {step === "signup" ? "Sign Up" : "Sign Up"}
        </div>


        {step === "signup" ? (
          <div className="space-y-4 text-[#C5C6C7]">
            {/* Name & Phone side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-[#0B0C10] border border-[#45A29E] rounded-lg text-[#C5C6C7] focus:ring-2 focus:ring-[#66FCF1]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 bg-[#0B0C10] border border-[#45A29E] rounded-lg text-[#C5C6C7] focus:ring-2 focus:ring-[#66FCF1]"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2 bg-[#0B0C10] border border-[#45A29E] rounded-lg text-[#C5C6C7] focus:ring-2 focus:ring-[#66FCF1]"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as "user" | "admin")}
                className="w-full px-4 py-2 bg-[#0B0C10] border border-[#45A29E] rounded-lg text-[#C5C6C7] focus:ring-2 focus:ring-[#66FCF1]"
              >
                <option value="user">Student</option>
                <option value="admin">Teacher</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-[#0B0C10] border border-[#45A29E] rounded-lg text-[#C5C6C7] focus:ring-2 focus:ring-[#66FCF1]"
              />
            </div>

            {/* OTP Method */}
            <div>
              <label className="block text-sm font-medium mb-1">Choose OTP Method</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="otpMethod"
                    value="email"
                    checked={otpMethod === "email"}
                    onChange={() => setOtpMethod("email")}
                    className="mr-2 accent-[#66FCF1]"
                  />
                  Email
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="otpMethod"
                    value="phone"
                    checked={otpMethod === "phone"}
                    onChange={() => setOtpMethod("phone")}
                    className="mr-2 accent-[#66FCF1]"
                  />
                  Phone
                </label>
              </div>
            </div>

            <button
              onClick={handleSignup}
              className="w-full bg-[#66FCF1] text-[#0B0C10] py-2 rounded-lg font-semibold hover:bg-[#45A29E] transition"
            >
              Send OTP
            </button>
          </div>
        ) : (
          <div className="space-y-4 text-[#C5C6C7]">
            <label className="block text-sm font-medium mb-1">Enter OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 bg-[#0B0C10] border border-[#45A29E] rounded-lg text-[#C5C6C7] focus:ring-2 focus:ring-[#66FCF1]"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-[#66FCF1] text-[#0B0C10] py-2 rounded-lg font-semibold hover:bg-[#45A29E] transition"
            >
              Verify OTP
            </button>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-[#C5C6C7]">
          Already have an account?{" "}
          <a href="/login" className="text-[#66FCF1] hover:text-[#45A29E] font-medium">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
