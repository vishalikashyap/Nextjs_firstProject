"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me").then(async (res) => {
      const data = await res.json();
      if (!data.user) router.push("/login");
      else setUser(data.user);
    });
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#0B0C10", color: "#C5C6C7" }}>
      {/* Navbar */}
      <nav
        className="px-6 py-4 flex justify-between items-center shadow-md"
        style={{ backgroundColor: "#1F2833" }}
      >
        <h1 className="text-xl font-bold tracking-wide">LearnWithUs</h1>
        <div className="flex items-center gap-4">
          {user && <span className="text-sm">👋 {user.email}</span>}
          <button
            onClick={logout}
            className="px-4 py-1 rounded-lg font-medium transition"
            style={{ backgroundColor: "#66FCF1", color: "#0B0C10" }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#45A29E")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#66FCF1")}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        <p>
          Welcome {user ? user.email : "Guest"}, this is your dashboard.
        </p>
      </main>
    </div>
  );
}
