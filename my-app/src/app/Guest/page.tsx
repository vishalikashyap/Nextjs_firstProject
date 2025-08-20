"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Simple Carousel Items
const carouselItems = [
  {
    title: "Learn Anytime, Anywhere",
    desc: "Access courses on demand, whether you're a student or teacher.",
    img: "https://source.unsplash.com/800x400/?online,learning",
  },
  {
    title: "Teach and Inspire",
    desc: "Upload your courses, share knowledge, and track student progress.",
    img: "https://source.unsplash.com/800x400/?teacher,classroom",
  },
  {
    title: "Interactive Learning",
    desc: "Quizzes, progress tracking, and certificates for achievements.",
    img: "https://source.unsplash.com/800x400/?students,e-learning",
  },
];

export default function GuestDashboard() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  // Auto slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0C10] text-[#C5C6C7]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-[#1F2833] shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="text-[#66FCF1] font-extrabold text-2xl"></div>
          <h1 className="text-xl font-bold text-[#66FCF1]">LearnWithUs</h1>
        </div>
        <div className="space-x-4">
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 rounded-lg border border-[#66FCF1] text-[#66FCF1] font-medium hover:bg-[#45A29E] hover:text-[#0B0C10] transition"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="px-4 py-2 rounded-lg bg-[#66FCF1] text-[#0B0C10] font-medium hover:bg-[#45A29E] transition"
          >
            Signup
          </button>
        </div>
      </nav>

      {/* Carousel / Hero */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-5xl bg-[#1F2833] rounded-2xl shadow-lg overflow-hidden border border-[#45A29E]">
          <img
            src={carouselItems[index].img}
            alt="carousel"
            className="w-full h-72 object-cover"
          />
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-[#66FCF1]">
              {carouselItems[index].title}
            </h2>
            <p className="text-[#C5C6C7] mt-2">{carouselItems[index].desc}</p>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center space-x-2 pb-4">
            {carouselItems.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i === index ? "bg-[#66FCF1]" : "bg-[#45A29E]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1F2833] text-[#C5C6C7] py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} LearnWithUs. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-[#66FCF1]">
              About Us
            </a>
            <a href="#" className="hover:text-[#66FCF1]">
              Contact
            </a>
            <a href="#" className="hover:text-[#66FCF1]">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
