"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { checkAuth, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 로딩 중일 때 스피너 표시
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
