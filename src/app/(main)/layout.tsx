'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Plane, Menu, X, Home, Plus, Link2, User, Bell, LogOut } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { fetchApi } from '@/lib/api';
import { removeTokens } from '@/lib/auth';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const menuItems = [
    { href: '/trips', icon: Home, label: '내 여행' },
    { href: '/trips/new', icon: Plus, label: '새 여행 만들기' },
    { href: '/join', icon: Link2, label: '초대코드로 참여' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b z-40 px-4">
        <div className="h-full flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
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
            {/* 유저 이름 */}
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
            {/* 로그아웃 버튼 */}
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

      {/* 모바일 사이드바 오버레이 */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r z-50 pt-14
        transform transition-transform duration-200
        sm:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        sm:z-30
      `}>
        <div className="p-4">
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-100'
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
        <div className="p-4 sm:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
