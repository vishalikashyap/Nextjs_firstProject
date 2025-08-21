"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Import icons
import { FaCode, FaDatabase, FaPaintBrush, FaCertificate, FaChalkboardTeacher, FaGraduationCap, FaBook } from "react-icons/fa";

const carouselItems = [
  {
    title: "Learn Anytime, Anywhere",
    desc: "Access courses on demand, whether you're a student or teacher.",
    img: "/cro-2.png",
  },
  {
    title: "Teach and Inspire",
    desc: "Upload your courses, share knowledge, and track student progress.",
    img: "/cro-3.png",
  },
  {
    title: "Interactive Learning",
    desc: "Quizzes, progress tracking, and certificates for achievements.",
    img: "/cro-4.png",
  },
];

// Course Data
const courses = [
  {
    id: 1,
    title: "Web Development",
    desc: "Learn to build modern websites with HTML, CSS, JS, and React.",
    price: "₹49",
    icon: <FaCode className="text-4xl text-[#66FCF1]" />,
    level: "Beginner",
    rating: 5,
  },
  {
    id: 2,
    title: "Data Science",
    desc: "Master Python, Pandas, and machine learning concepts.",
    price: "₹69",
    icon: <FaDatabase className="text-4xl text-[#66FCF1]" />,
    level: "Intermediate",
    rating: 4,
  },
  {
    id: 3,
    title: "UI/UX Design",
    desc: "Design engaging user experiences with Figma & design thinking.",
    price: "₹59",
    icon: <FaPaintBrush className="text-4xl text-[#66FCF1]" />,
    level: "Advanced",
    rating: 5,
  },
  {
    id: 4,
    title: "Certification in Coding Basics",
    desc: "Start coding with Python, hands-on projects, and earn a certificate.",
    price: "₹1,299",
    icon: <FaCertificate className="text-4xl text-[#66FCF1]" />,
    level: "Advanced",
    rating: 5,
  },
  {
    id: 5,
    title: "Class 10 Science Notes",
    desc: "Complete NCERT-based science notes with diagrams and solved examples.",
    price: "₹499",
    icon: <FaBook className="text-4xl text-[#66FCF1]" />,
    level: "Intermediate",
    rating: 4,
  },
  {
    id: 6,
    title: "Mathematics Crash Course",
    desc: "Learn shortcuts, tricks, and problem-solving techniques for exams.",
    price: "₹699",
    icon: <FaGraduationCap className="text-4xl text-[#66FCF1]" />,
    level: "Intermediate",
    rating: 4,
  },
  {
    id: 7,
    title: "Spoken English",
    desc: "Improve communication skills with interactive sessions and notes.",
    price: "₹899",
    icon: <FaChalkboardTeacher className="text-4xl text-[#66FCF1]" />,
    level: "Intermediate",
    rating: 4,
  },
  {
    id: 8,
    title: "Certification in Coding Basics",
    desc: "Start coding with Python, hands-on projects, and earn a certificate.",
    price: "₹1,299",
    icon: <FaCertificate className="text-4xl text-[#66FCF1]" />,
    level: "Intermediate",
    rating: 4,
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#0B0C10] via-[#0f1b24] to-[#1F2833] text-[#EAEAEA]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-[#0B0C10]/90 backdrop-blur-lg shadow-lg sticky top-0 z-50">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-[#66FCF1] to-[#45A29E] bg-clip-text text-transparent">
          LearnWithUs
        </h1>
        <div className="space-x-4">
          <button
            onClick={() => router.push("/login")}
            className="px-5 py-2 rounded-lg border border-[#66FCF1] text-[#66FCF1] font-medium hover:bg-[#66FCF1] hover:text-[#0B0C10] transition-all shadow-md"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#66FCF1] to-[#45A29E] text-[#0B0C10] font-semibold hover:opacity-90 transition-all shadow-lg"
          >
            Signup
          </button>
        </div>
      </nav>

      {/* Hero Carousel */}
      <div className="w-full relative">
        <img
          src={carouselItems[index].img}
          alt="carousel"
          className="w-full h-[550px] object-cover"
        />

        {/* Overlay text */}
        <div className="absolute inset-0 bg-black/50 flex flex-col items-start justify-center px-10 md:px-20">
          <div className="backdrop-blur-md bg-[#0B0C10]/40 p-6 md:p-10 rounded-2xl max-w-2xl animate-fadeIn">
            <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#66FCF1] to-[#45A29E] bg-clip-text text-transparent drop-shadow-lg leading-snug">
              {carouselItems[index].title}
            </h2>
            <p className="text-lg md:text-xl text-gray-200 mt-4 leading-relaxed">
              {carouselItems[index].desc}
            </p>

            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => router.push("/signup")}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#66FCF1] to-[#45A29E] text-[#0B0C10] font-semibold shadow-lg hover:scale-105 hover:shadow-[#66FCF1]/30 transition-all"
              >
                Get Started
              </button>
              <button
  onClick={() => {
    const section = document.getElementById("popular-courses");
    section?.scrollIntoView({ behavior: "smooth" });
  }}
  className="px-6 py-3 rounded-lg border border-[#66FCF1] text-[#66FCF1] font-medium hover:bg-[#66FCF1] hover:text-[#0B0C10] transition-all shadow-md"
>
  Explore Courses
</button>
            </div>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {carouselItems.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-4 h-4 rounded-full transition-all ${
                i === index ? "bg-[#66FCF1] scale-110" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>

     {/* Course Section */}
<section id="popular-courses" className="max-w-7xl mx-auto px-6 py-20">
  <h2 className="text-5xl font-extrabold text-center mb-14 bg-gradient-to-r from-[#66FCF1] to-[#45A29E] bg-clip-text text-transparent drop-shadow-lg">
    Popular Courses
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
    {courses.map((course) => (
      <div
        key={course.id}
        className="group bg-[#1F2833] rounded-3xl shadow-xl overflow-hidden hover:shadow-[#66FCF1]/40 hover:scale-105 transition-all duration-300 flex flex-col"
      >
        {/* Icon / Banner */}
        <div className="flex justify-center items-center bg-[#0B0C10] py-10 group-hover:bg-[#0f1b24] transition">
          <div className="text-6xl text-[#66FCF1]">{course.icon}</div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col flex-grow">
          <h3 className="text-2xl font-bold text-[#66FCF1] mb-3">
            {course.title}
          </h3>
          <p className="text-gray-300 mb-4 leading-relaxed">
            {course.desc}
          </p>

          {/* Tags + Rating */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs px-3 py-1 rounded-full bg-[#66FCF1]/20 text-[#66FCF1]">
              {course.level}
            </span>
            <span className="flex items-center text-yellow-400 text-sm">
              {"⭐".repeat(course.rating)}{" "}
              <span className="ml-2 text-gray-400">{course.rating}.0</span>
            </span>
          </div>

          {/* Price + Button */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700">
            <span className="text-xl font-extrabold text-[#45A29E]">
              {course.price}
            </span>
            <button
              onClick={() => router.push(`/courses/${course.id}`)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#66FCF1] to-[#45A29E] text-[#0B0C10] font-semibold shadow-lg group-hover:scale-105 transition-all hover:shadow-[#66FCF1]/30"
            >
              Buy Now 
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

{/* Why We Need This Section */}
<section className="max-w-6xl mx-auto px-6 py-20">
  <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#66FCF1] to-[#45A29E] bg-clip-text text-transparent">
    Why We Need This?
  </h2>

  <div className="relative border-l-4 border-[#66FCF1] pl-8 space-y-12">
    {/* Item 1 */}
    <div className="relative">
      <span className="absolute -left-6 top-0 w-10 h-10 flex items-center justify-center rounded-full bg-[#66FCF1] text-[#0B0C10] font-bold">
        1
      </span>
      <h3 className="text-2xl pl-5 font-semibold text-[#66FCF1]">Learn Anytime</h3>
      <p className="text-gray-300 mt-2">
        Access courses whenever you want, at your own pace, without restrictions.
      </p>
    </div>

    {/* Item 2 */}
    <div className="relative">
      <span className="absolute -left-6 top-0 w-10 h-10 flex items-center justify-center rounded-full bg-[#45A29E] text-[#0B0C10] font-bold">
        2
      </span>
      <h3 className="text-2xl  pl-5 font-semibold text-[#66FCF1]">Affordable Education</h3>
      <p className="text-gray-300 mt-2">
        Get quality learning without burning a hole in your pocket.
      </p>
    </div>

    {/* Item 3 */}
    <div className="relative">
      <span className="absolute -left-6 top-0 w-10 h-10 flex items-center justify-center rounded-full bg-[#66FCF1] text-[#0B0C10] font-bold">
        3
      </span>
      <h3 className="text-2xl  pl-5 font-semibold text-[#66FCF1]">Industry-Relevant Skills</h3>
      <p className="text-gray-300 mt-2">
        Stay up to date with the tools and technologies top companies use today.
      </p>
    </div>

    {/* Item 4 */}
    <div className="relative">
      <span className="absolute -left-6 top-0 w-10 h-10 flex items-center justify-center rounded-full bg-[#45A29E] text-[#0B0C10] font-bold">
        4
      </span>
      <h3 className="text-2xl  pl-5 font-semibold text-[#66FCF1]">Career Growth</h3>
      <p className="text-gray-300 mt-2">
        Build a strong portfolio, gain certificates, and improve career opportunities.
      </p>
    </div>
  </div>
</section>

{/* Review / Testimonials Section */}
<section className="max-w-6xl mx-auto px-6 py-20">
  <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#66FCF1] to-[#45A29E] bg-clip-text text-transparent">
    What Our Students Say
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
    {[
      {
        name: "Riya Sharma",
        role: "Student, Web Development",
        review:
          "The courses are structured beautifully. I was able to build my first website in just 2 weeks!",
        img: "/student1.jpg",
      },
      {
        name: "Arjun Mehta",
        role: "Teacher, Data Science",
        review:
          "Great platform for teaching. Uploading my content and tracking student progress is super easy.",
        img: "/student2.jpg",
      },
      {
        name: "Sneha Verma",
        role: "Spoken English Learner",
        review:
          "I improved my communication skills drastically. The interactive sessions are amazing!",
        img: "/student3.jpg",
      },
    ].map((item, i) => (
      <div
        key={i}
        className="bg-[#1F2833] p-8 rounded-2xl shadow-lg hover:shadow-[#66FCF1]/30 transition-all duration-300 flex flex-col justify-between"
      >
        <p className="text-gray-300 italic leading-relaxed mb-6">“{item.review}”</p>

        <div className="flex items-center justify-between mt-4">
          <div>
            <h3 className="text-lg font-bold text-[#66FCF1]">{item.name}</h3>
            <p className="text-sm text-gray-400">{item.role}</p>
          </div>
          {/* <img
            src={item.img}
            alt={item.name}
            className="w-14 h-14 rounded-full border-2 border-[#66FCF1] ml-4"
          /> */}
           <div className="w-14 h-14 rounded-full border-2 border-[#66FCF1] ml-4 flex items-center justify-center bg-[#0B0C10] text-[#66FCF1] font-bold text-lg">
    {item.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()}
  </div>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Footer */}
      <footer className="bg-[#0B0C10] text-gray-400 py-8 mt-auto border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm">
            © {new Date().getFullYear()} LearnWithUs. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            {["About Us", "Contact", "Privacy Policy"].map((link, i) => (
              <a
                key={i}
                href="#"
                className="hover:text-[#66FCF1] transition"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
