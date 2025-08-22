"use client";
import { Home, BookOpen, FileText, User, Settings, LogOut } from "lucide-react";

interface SidebarProps {
  onSelect: (page: string) => void;
  onLogout: () => void;
}

export default function Sidebar({ onSelect, onLogout }: SidebarProps) {
  const menu = [
    { id: "dashboard", label: "Dashboard", icon: <Home /> },
    { id: "lectures", label: "Lectures", icon: <BookOpen /> },
    { id: "notes", label: "Notes", icon: <FileText /> },
    { id: "profile", label: "Profile", icon: <User /> },
    { id: "settings", label: "Settings", icon: <Settings /> },
  ];

  return (
    <aside className="w-20 md:w-60 bg-[#66FCF1] text-black flex flex-col items-center md:items-start py-6 space-y-6">
      <nav className="flex-1 flex flex-col gap-6 items-center md:items-start w-full mt-6">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className="flex items-center gap-3 px-4 py-2 hover:bg-[#11988f] rounded-lg w-14 md:w-full"
          >
            {item.icon}
            <span className="hidden md:block">{item.label}</span>
          </button>
        ))}
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-2 mt-6 hover:bg-red-500 text-white rounded-lg w-14 md:w-full"
        >
          <LogOut />
          <span className="hidden md:block">Logout</span>
        </button>
      </nav>
    </aside>
  );
}
