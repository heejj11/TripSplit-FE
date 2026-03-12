"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Home, Plus, Link2 } from "lucide-react";
import Header from "@/components/layout/Header";
import { useAuthStore } from "@/stores/authStore";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isLoggedIn, isLoading } = useAuthStore();

  // 비로그인 시 로그인 페이지로 이동
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoading, isLoggedIn, router]);

  const menuItems = [
    { href: "/trips", icon: Home, label: "내 여행" },
    { href: "/trips/new", icon: Plus, label: "새 여행 만들기" },
    { href: "/join", icon: Link2, label: "초대코드로 참여" },
  ];

  // 로딩 중
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 비로그인 시 빈 화면 (리다이렉트 중)
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* 헤더 */}
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      {/* 모바일 사이드바 오버레이 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <aside
        className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r z-50 pt-14
        transform transition-transform duration-200
        sm:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        sm:z-30
      `}
      >
        <div className="p-4">
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* 메인 컨텐츠 */}
      <main className="pt-14 sm:pl-64">
        <div className="p-4 sm:p-6">{children}</div>
      </main>
    </div>
  );
}
