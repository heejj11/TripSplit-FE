"use client";

import Link from "next/link";
import { Plane, Users, Receipt, Calculator, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: Users,
      title: "간편한 초대",
      description: "초대 코드 하나로 친구들과 함께 여행 경비를 관리하세요",
    },
    {
      icon: Receipt,
      title: "지출 기록",
      description: "누가, 언제, 얼마를 썼는지 한눈에 확인할 수 있어요",
    },
    {
      icon: Calculator,
      title: "자동 정산",
      description:
        "복잡한 계산 없이 누가 누구에게 얼마를 보내야 하는지 알려드려요",
    },
  ];

  const splitMethods = [
    { emoji: "➗", title: "균등 분배", desc: "모두 똑같이" },
    { emoji: "📊", title: "비율 분배", desc: "비율대로" },
    { emoji: "💵", title: "금액 지정", desc: "직접 입력" },
    { emoji: "🚫", title: "일부 제외", desc: "참여자만" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Plane size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg">TripSplit</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="px-3 sm:px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="px-3 sm:px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              시작하기
            </Link>
          </div>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            여행 정산,
            <br className="sm:hidden" />
            <span className="text-blue-600"> 이제 쉽게</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            친구들과 여행 경비 나누기, 더 이상 복잡하지 않아요.
            <br className="hidden sm:block" />
            TripSplit으로 간편하게 기록하고 정산하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              시작하기
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition"
            >
              로그인
            </Link>
          </div>
        </div>
      </section>

      {/* 기능 소개 */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
            왜 TripSplit인가요?
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center p-4 sm:p-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={28} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 정산 방식 */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4">
            다양한 정산 방식
          </h2>
          <p className="text-gray-600 text-center mb-8 sm:mb-10 text-sm sm:text-base">
            상황에 맞게 선택하세요
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {splitMethods.map((method) => (
              <div
                key={method.title}
                className="bg-white p-4 sm:p-6 rounded-xl border text-center hover:shadow-md transition"
              >
                <span className="text-3xl sm:text-4xl mb-2 sm:mb-3 block">
                  {method.emoji}
                </span>
                <h4 className="font-semibold text-sm sm:text-base">
                  {method.title}
                </h4>
                <p className="text-gray-500 text-xs sm:text-sm">
                  {method.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
            회원가입 후 바로 여행을 만들고 친구들을 초대할 수 있어요
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
          >
            시작하기
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <Plane size={14} className="text-white" />
            </div>
            <span className="font-semibold text-sm">TripSplit</span>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm">
            © 2026 TripSplit. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
