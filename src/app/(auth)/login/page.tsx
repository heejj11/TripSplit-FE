import SocialLoginButtons from "@/components/auth/SocialLoginButtons";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-sm border p-6 sm:p-8">
      {/* 타이틀 */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">로그인</h1>
        <p className="text-sm text-gray-500 mt-2">
          TripSplit에 오신 것을 환영해요
        </p>
      </div>

      {/* 소셜 로그인 버튼 */}
      <SocialLoginButtons />

      {/* 회원가입 링크 */}
      <p className="text-center text-sm text-gray-500 mt-6">
        소셜 계정으로 간편하게 시작하세요
      </p>
    </div>
  );
}
