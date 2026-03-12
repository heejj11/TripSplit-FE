"use client";

import { useState } from "react";
import { getKakaoLoginUrl, getGoogleLoginUrl } from "@/lib/auth";

export default function SocialLoginButtons() {
  const [isLoading, setIsLoading] = useState<"kakao" | "google" | null>(null);

  const handleSocialLogin = (provider: "kakao" | "google") => {
    setIsLoading(provider);

    const loginUrl =
      provider === "kakao" ? getKakaoLoginUrl() : getGoogleLoginUrl();
    window.location.href = loginUrl;
  };

  return (
    <div className="space-y-4">
      {/* 카카오 로그인 */}
      <button
        type="button"
        onClick={() => handleSocialLogin("kakao")}
        disabled={isLoading !== null}
        className="w-full flex items-center justify-center gap-3 py-4 bg-[#FEE500] text-[#191919] rounded-xl font-semibold text-base hover:bg-[#FDD835] transition disabled:opacity-50"
      >
        <svg width="24" height="24" viewBox="0 0 18 18" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 0C4.029 0 0 3.134 0 7.003c0 2.416 1.558 4.54 3.931 5.783l-.993 3.7c-.089.318.277.571.555.388l4.382-2.967c.374.044.752.067 1.125.067 4.971 0 9-3.134 9-7.003C18 3.134 13.971 0 9 0z"
            fill="#191919"
          />
        </svg>
        {isLoading === "kakao" ? "로그인 중..." : "카카오로 시작하기"}
      </button>

      {/* 구글 로그인 */}
      <button
        type="button"
        onClick={() => handleSocialLogin("google")}
        disabled={isLoading !== null}
        className="w-full flex items-center justify-center gap-3 py-4 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold text-base hover:bg-gray-50 transition disabled:opacity-50"
      >
        <svg width="24" height="24" viewBox="0 0 18 18" fill="none">
          <path
            d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
            fill="#4285F4"
          />
          <path
            d="M9.003 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z"
            fill="#34A853"
          />
          <path
            d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z"
            fill="#FBBC05"
          />
          <path
            d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.002 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z"
            fill="#EA4335"
          />
        </svg>
        {isLoading === "google" ? "로그인 중..." : "Google로 시작하기"}
      </button>
    </div>
  );
}
