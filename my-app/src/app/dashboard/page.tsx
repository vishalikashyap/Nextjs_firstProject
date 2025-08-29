"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar"; // adjust path accordingly
import Lectures from "@/components/Lectures";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState("Class 10");
  const [activePage, setActivePage] = useState("dashboard");
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
    localStorage.removeItem("user");
    router.push("/login");
  };

  // Notes Data
  const notesData: Record<string, string[]> = {
    "Class 9": ["Algebra Basics.pdf", "Science Atoms.docx", "History Medieval.ppt"],
    "Class 10": ["Trigonometry Notes.pdf", "Physics Laws.docx", "History WW2.ppt"],
    "Class 11": ["Calculus.pdf", "Organic Chemistry.docx", "Political Science.pdf"],
    "Class 12": ["Integration Notes.pdf", "Modern Physics.docx", "Economics.pdf"],
    "Web Development": ["HTML", "CSS", "BootStrap", "Angular", "React.js", "Next.js", "Other"],
  };

  // Components for main content
  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <>
            <section>
              <h2 className="text-xl font-semibold mb-4">Latest Lectures</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Maths - Algebra", "Science - Physics", "History - WW2"].map((lecture) => (
                  <div key={lecture} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
                    <span className="font-medium">{lecture}</span>
                    <button className="px-3 py-1 text-sm bg-[#11988f] text-white rounded-lg">View</button>
                  </div>
                ))}
              </div>
            </section>
          </>
        );
      case "lectures":
        return  <Lectures />;
      case "notes":
        return (
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
                  <button className="px-3 py-1 text-sm bg-yellow-600 text-white rounded-lg">Download</button>
                </div>
              ))}
            </div>
          </section>
        );
      case "profile":
        return <h2 className="text-xl font-semibold">Profile Page</h2>;
      case "settings":
        return <h2 className="text-xl font-semibold">Settings Page</h2>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      {/* Top Navbar */}
      <header className="w-full bg-[#0B0C10]/90 text-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-[#11988f]">LearnWithUs</h1>
        <div className="flex items-center gap-6">
          {user && <span className="font-medium"> Hi, {user.name || "Student"}</span>}
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar onSelect={setActivePage} onLogout={logout}/>

        {/* Main Content */}
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
