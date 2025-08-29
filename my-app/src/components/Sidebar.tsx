"use client";
import { Home, BookOpen, FileText, User, Settings, LogOut } from "lucide-react";

interface SidebarProps {
  onSelect: (page: string) => void;
  onLogout: () => void;
}

export default function Sidebar({ onSelect, onLogout }: SidebarProps) {
  const menu = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { id: "lectures", label: "Lectures", icon: <BookOpen size={20} /> },
    { id: "notes", label: "Notes", icon: <FileText size={20} /> },
    { id: "profile", label: "Profile", icon: <User size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-20 md:w-64 bg-[#66FCF1] text-black flex flex-col py-6 sticky top-0 h-screen shadow-lg">
      <nav className="flex-1 flex flex-col gap-2 px-2 md:px-4 mt-4 w-full">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className="flex items-center gap-3 px-3 md:px-4 py-3 rounded-lg transition-colors w-full hover:bg-[#11988f] hover:text-white"
          >
            {item.icon}
            <span className="hidden md:block font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="px-2 md:px-4 w-full mb-20">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-3 md:px-4 py-3 rounded-lg transition-colors w-full bg-red-500 text-white hover:bg-red-600"
        >
          <LogOut size={20} />
          <span className="hidden md:block font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
