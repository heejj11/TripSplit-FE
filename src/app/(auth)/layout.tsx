import Link from "next/link";
import { Plane } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
      {/* 헤더 - 로고만 */}
      <header className="py-4 sm:py-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 w-fit mx-auto">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Plane size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg">TripSplit</span>
        </Link>
      </header>

      {/* 컨텐츠 - 가운데 정렬 */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
        {children}
      </main>

      {/* 푸터 */}
      <footer className="py-4 text-center text-xs text-gray-500">
        © 2026 TripSplit
      </footer>
    </div>
  );
}
