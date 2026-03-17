"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Users, Calendar, ChevronRight } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { fetchApi } from "@/lib/api";
import { ApiResponse, TripListItem } from "@/types";

export default function TripsPage() {
  const { user, isLoggedIn, isLoading: authLoading } = useAuthStore();
  const router = useRouter();
  const [trips, setTrips] = useState<TripListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.replace("/login");
    }
  }, [authLoading, isLoggedIn, router]);

  useEffect(() => {
    if (isLoggedIn) {
      loadTrips();
    }
  }, [isLoggedIn]);

  const loadTrips = async () => {
    try {
      const response = await fetchApi<ApiResponse<TripListItem[]>>("/trips");
      setTrips(response.data);
    } catch (error) {
      console.error("여행 목록 로딩 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (start: string | null, end: string | null) => {
    if (!start) return "날짜 미정";
    const startDate = new Date(start).toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
    });
    if (!end) return startDate;
    const endDate = new Date(end).toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
    });
    return `${startDate} - ${endDate}`;
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: currency || "KRW",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn) return null;

  return (
    <div className="max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">내 여행</h1>
          <p className="text-gray-500 text-sm mt-1">
            {user?.nickname}님, 총 {trips.length}개의 여행
          </p>
        </div>
        <Link
          href="/trips/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">새 여행</span>
        </Link>
      </div>

      {/* 여행 목록 */}
      {trips.length > 0 ? (
        <div className="space-y-4">
          {trips.map((trip) => (
            <Link
              key={trip.id}
              href={`/trips/${trip.id}`}
              className="block bg-white rounded-2xl p-5 shadow-sm border hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {trip.title}
                  </h3>
                  {trip.description && (
                    <p className="text-gray-500 text-sm mb-3 line-clamp-1">
                      {trip.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={16} />
                      {formatDate(trip.startDate, trip.endDate)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users size={16} />
                      {trip.memberCount}명
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-gray-400">총 지출</p>
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(trip.totalExpense, trip.currency)}
                    </p>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* 빈 상태 */
        <div className="bg-white rounded-2xl p-12 shadow-sm border text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
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
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            아직 여행이 없어요
          </h3>
          <p className="text-gray-500 mb-6">
            새 여행을 만들어 친구들과 함께해보세요!
          </p>
          <Link
            href="/trips/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            새 여행 만들기
          </Link>
        </div>
      )}
    </div>
  );
}
