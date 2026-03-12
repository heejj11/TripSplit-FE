"use client";

import Link from "next/link";
import { Plane, Menu, Bell, User, LogOut } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { fetchApi } from "@/lib/api";
import { removeTokens } from "@/lib/auth";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user } = useAuthStore();

  const handleLogout = async () => {
    try {
      await fetchApi("/auth/logout", { method: "POST" });
    } catch (e) {
      // 에러 무시
    } finally {
      removeTokens();
      window.location.href = "/login";
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b z-40 px-4">
      <div className="h-full flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-lg sm:hidden"
          >
            <Menu size={20} />
          </button>
          <Link href="/trips" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Plane size={16} className="text-white" />
            </div>
            <span className="font-bold hidden sm:block">TripSplit</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 hidden sm:block">
            {user?.nickname}
          </span>
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <Link href="/mypage" className="p-2 hover:bg-gray-100 rounded-lg">
            <User size={20} />
          </Link>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-red-500"
            title="로그아웃"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
