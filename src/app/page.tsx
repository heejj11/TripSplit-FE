import Link from "next/link";
import { Plane, Receipt, Users, Calculator, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 헤더 */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-gray-900"
          >
            <Plane className="text-blue-600" size={24} />
            TripSplit
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              시작하기
            </Link>
          </nav>
        </div>
      </header>

      {/* 히어로 */}
      <section className="flex-1 flex items-center bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-gray-900">
              여행 비용 정산,
              <br />
              <span className="text-blue-600">더 이상 복잡하지 않게</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              여러 명이 여행 중 사용한 비용을,
              <br />
              합의한 기준에 따라 공정하게 정산하세요.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/signup"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                시작하기
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 기능 소개 */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-12 text-gray-900">
            이렇게 쉬울 수가 없어요
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Users className="text-blue-600" size={28} />}
              title="간편한 초대"
              description="초대 코드 하나로 친구들을 쉽게 추가하세요"
            />
            <FeatureCard
              icon={<Receipt className="text-blue-600" size={28} />}
              title="지출 기록"
              description="누가, 얼마를, 어디에 썼는지 한눈에 확인하세요"
            />
            <FeatureCard
              icon={<Calculator className="text-blue-600" size={28} />}
              title="자동 정산"
              description="누가 누구에게 얼마를 보내야 하는지 자동 계산"
            />
          </div>
        </div>
      </section>

      {/* 정산 방식 소개 */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">
            다양한 정산 방식
          </h2>
          <p className="text-gray-600 text-center mb-10">
            상황에 맞는 정산 방식을 선택하세요
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SplitTypeCard
              emoji="➗"
              title="균등 분배"
              description="모두 똑같이"
            />
            <SplitTypeCard
              emoji="📊"
              title="비율 분배"
              description="3:2:1 비율로"
            />
            <SplitTypeCard
              emoji="💵"
              title="금액 지정"
              description="직접 입력"
            />
            <SplitTypeCard
              emoji="🚫"
              title="일부 제외"
              description="선택 제외"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            다음 여행, 정산 걱정 없이 떠나세요
          </h2>
          <p className="text-blue-100 mb-6">친구들과 함께 사용해보세요</p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition"
          >
            시작하기
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="border-t border-gray-200 py-6 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Plane size={18} />
              <span className="font-medium">TripSplit</span>
            </div>
            <p className="text-sm text-gray-500">
              © 2026 TripSplit. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function SplitTypeCard({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition bg-white cursor-pointer">
      <span className="text-2xl">{emoji}</span>
      <h3 className="font-semibold mt-2 mb-1 text-gray-900 text-sm">{title}</h3>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}
