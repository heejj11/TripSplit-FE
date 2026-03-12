"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { saveTokens } from "@/lib/auth";
import { fetchApi } from "@/lib/api";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuthStore();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    handleCallback();
  }, []);

  const handleCallback = async () => {
    try {
      const accessToken = searchParams.get("accessToken");
      const refreshToken = searchParams.get("refreshToken");
      const error = searchParams.get("error");

      if (error) {
        throw new Error(error);
      }

      if (!accessToken || !refreshToken) {
        throw new Error("토큰이 없습니다");
      }

      // 토큰 저장
      saveTokens(accessToken, refreshToken);

      // 사용자 정보 가져오기
      const response = await fetchApi<{ data: any }>("/auth/me");
      setUser(response.data);

      setStatus("success");

      // 메인 페이지로 이동
      setTimeout(() => {
        router.replace("/trips");
      }, 1000);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "로그인 실패");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        {status === "loading" && (
          <>
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">로그인 처리 중...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-gray-900 font-medium">로그인 성공!</p>
            <p className="text-gray-500 text-sm mt-1">잠시 후 이동합니다...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <p className="text-red-600 font-medium">로그인 실패</p>
            <p className="text-gray-500 text-sm mt-1">{errorMessage}</p>
            <button
              onClick={() => router.push("/login")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
            >
              다시 시도
            </button>
          </>
        )}
      </div>
    </div>
  );
}
