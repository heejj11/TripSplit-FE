"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export default function TripsPage() {
  const { user, isLoggedIn, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoading, isLoggedIn, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto p-4">
        {/* 환영 메시지 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            안녕하세요, {user?.nickname}님! 👋
          </h2>
          <p className="text-gray-600">
            TripSplit에서 여행 비용을 쉽게 정산하세요.
          </p>
        </div>

        {/* 새 여행 만들기 버튼 */}
        <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition mb-6">
          + 새 여행 만들기
        </button>

        {/* 빈 상태 */}
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-gray-500 mb-1">아직 여행이 없어요</p>
          <p className="text-gray-400 text-sm">
            새 여행을 만들어 친구들과 함께해보세요!
          </p>
        </div>
      </main>
    </div>
  );
}
