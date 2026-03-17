"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Eye, EyeOff, Check } from "lucide-react";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);

    // TODO: API 호출
    console.log("회원가입:", formData);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/login");
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} 회원가입`);
    // TODO: 소셜 로그인 구현
  };

  // 비밀번호 유효성 검사
  const passwordChecks = [
    { label: "8자 이상", valid: formData.password.length >= 8 },
    { label: "영문 포함", valid: /[a-zA-Z]/.test(formData.password) },
    { label: "숫자 포함", valid: /[0-9]/.test(formData.password) },
  ];

  const isPasswordMatch =
    formData.password === formData.confirmPassword &&
    formData.confirmPassword.length > 0;

  return (
    <div className="w-full max-w-sm sm:max-w-md">
      <div className="bg-white rounded-2xl shadow-sm border p-6 sm:p-8">
        {/* 타이틀 */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            회원가입
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            TripSplit과 함께 여행을 시작하세요
          </p>
        </div>

        {/* 소셜 로그인 버튼 */}
        <SocialLoginButtons />

        {/* 구분선 */}
        {/* <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">또는</span>
          </div>
        </div> */}

        {/* 회원가입 폼 */}
        {/* <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              이메일
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              닉네임
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="여행에서 사용할 이름"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              비밀번호
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formData.password && (
              <div className="flex flex-wrap gap-2 mt-2">
                {passwordChecks.map((check) => (
                  <span
                    key={check.label}
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                      check.valid 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {check.valid && <Check size={12} />}
                    {check.label}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              비밀번호 확인
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  formData.confirmPassword 
                    ? isPasswordMatch 
                      ? 'border-green-500' 
                      : 'border-red-500'
                    : 'border-gray-300'
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formData.confirmPassword && !isPasswordMatch && (
              <p className="text-xs text-red-500 mt-1">비밀번호가 일치하지 않습니다</p>
            )}
          </div>

          <div className="flex items-start gap-2">
            <input 
              type="checkbox" 
              id="agree"
              className="w-4 h-4 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
              required
            />
            <label htmlFor="agree" className="text-sm text-gray-600">
              <Link href="/terms" className="text-blue-600 hover:underline">이용약관</Link> 및{' '}
              <Link href="/privacy" className="text-blue-600 hover:underline">개인정보처리방침</Link>에 동의합니다
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '가입 중...' : '회원가입'}
          </button>
        </form> */}

        {/* 로그인 링크 */}
        {/* <p className="text-center text-sm text-gray-500 mt-6">
          이미 계정이 있으신가요?{" "}
          <Link
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            로그인
          </Link>
        </p> */}
      </div>
    </div>
  );
}
