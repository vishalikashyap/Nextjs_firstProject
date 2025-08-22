"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Home, BookOpen, FileText, User, Settings, LogOut } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState("Class 10"); // Default
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me").then(async (res) => {
      const data = await res.json();
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.user?._id,
          name: data.user?.name,
          email: data.user?.email,
          phone: data.user?.phone,
          token: data.token,
        })
      );

      if (!data.user) router.push("/login");
      else setUser(data.user);
    });
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  // Sample Notes Data (Later can come from DB)
  const notesData: Record<string, string[]> = {
    "Class 9": ["Algebra Basics.pdf", "Science Atoms.docx", "History Medieval.ppt"],
    "Class 10": ["Trigonometry Notes.pdf", "Physics Laws.docx", "History WW2.ppt"],
    "Class 11": ["Calculus.pdf", "Organic Chemistry.docx", "Political Science.pdf"],
    "Class 12": ["Integration Notes.pdf", "Modern Physics.docx", "Economics.pdf"],
    "Web Development": ["HTML", "CSS", "BootStrap", "Angular", "React.js", "Next.js", "Other"]

  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      {/* Top Navbar */}
      <header className="w-full bg-[#0B0C10]/90 text-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#11988f]">LearnWithUs</h1>
        <div className="flex items-center gap-6">
          {user && (
            <span className="font-medium">👋 Hi, {user.name || "Student"}</span>
          )}
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#66FCF1] text-black hover:bg-[#11988f] transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-20 md:w-60 bg-[#66FCF1] text-black flex flex-col items-center md:items-start py-6 space-y-6">
          <nav className="flex-1 flex flex-col gap-6 items-center md:items-start w-full mt-6">
            <button className="flex items-center gap-3 px-4 py-2 hover:bg-[#11988f] rounded-lg w-14 md:w-full">
              <Home /> <span className="hidden md:block">Dashboard</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-2 hover:bg-[#11988f] rounded-lg w-14 md:w-full">
              <BookOpen /> <span className="hidden md:block">Lectures</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-2 hover:bg-[#11988f] rounded-lg w-14 md:w-full">
              <FileText /> <span className="hidden md:block">Notes</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-2 hover:bg-[#11988f] rounded-lg w-14 md:w-full">
              <User /> <span className="hidden md:block">Profile</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-2 hover:bg-[#11988f] rounded-lg w-14 md:w-full">
              <Settings /> <span className="hidden md:block">Settings</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left / Middle Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lectures Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Latest Lectures</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Maths - Algebra", "Science - Physics", "History - WW2"].map(
                  (lecture) => (
                    <div
                      key={lecture}
                      className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
                    >
                      <span className="font-medium">{lecture}</span>
                      <button className="px-3 py-1 text-sm bg-[#11988f] text-white rounded-lg">
                        View
                      </button>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* Notes Section with Class Selection */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Shared Notes</h2>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="border rounded-lg px-3 py-1 text-sm"
                >
                  {Object.keys(notesData).map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notesData[selectedClass].map((note) => (
                  <div
                    key={note}
                    className="bg-yellow-100 rounded-xl p-4 flex justify-between items-center"
                  >
                    <span>{note}</span>
                    <button className="px-3 py-1 text-sm bg-yellow-600 text-white rounded-lg">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Progress */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-100 rounded-xl p-4">
                  <p className="font-semibold">Maths</p>
                  <p>70% Completed</p>
                </div>
                <div className="bg-green-100 rounded-xl p-4">
                  <p className="font-semibold">Science</p>
                  <p>50% Completed</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Classes */}
            <section className="bg-white rounded-xl shadow p-6">
              <h2 className="font-semibold mb-2">Upcoming Classes</h2>
              <p>📅 Monday - 10 AM - Algebra</p>
              <p>📅 Wednesday - 2 PM - Physics</p>
            </section>

            {/* Announcements */}
            <section className="bg-white rounded-xl shadow p-6">
              <h2 className="font-semibold mb-4">Announcements</h2>
              <ul className="list-disc list-inside text-sm space-y-2">
                <li>Mid-term exams start next week.</li>
                <li>Submit assignments by Friday.</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
