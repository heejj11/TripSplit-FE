'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Settings, Copy, Share2, Users, Receipt, 
  PieChart, ChevronDown, ChevronUp, Plus, Calculator, Check
} from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { ApiResponse, TripDetail, ExpenseListItem } from '@/types';

export default function TripDetailPage() {
  const router = useRouter();
  const params = useParams();
  const tripId = params.id as string;
  
  const [trip, setTrip] = useState<TripDetail | null>(null);
  const [expenses, setExpenses] = useState<ExpenseListItem[]>([]);
  const [activeTab, setActiveTab] = useState<'expenses' | 'stats' | 'settlement'>('expenses');
  const [showInvite, setShowInvite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadTripData();
  }, [tripId]);

  const loadTripData = async () => {
    try {
      const [tripRes, expensesRes] = await Promise.all([
        fetchApi<ApiResponse<TripDetail>>(`/trips/${tripId}`),
        fetchApi<ApiResponse<ExpenseListItem[]>>(`/trips/${tripId}/expenses`)
      ]);
      setTrip(tripRes.data);
      setExpenses(expensesRes.data);
    } catch (error) {
      console.error('여행 데이터 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyInviteCode = () => {
    if (!trip) return;
    navigator.clipboard.writeText(trip.inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' });
  };

  const formatCurrency = (amount: number) => {
    if (!trip) return `₩${amount.toLocaleString()}`;
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: trip.currency || 'KRW',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryEmoji = (icon: string | undefined) => {
    const emojiMap: Record<string, string> = {
      'bed': '🏨',
      'utensils': '🍽️',
      'car': '🚗',
      'camera': '📸',
      'shopping-bag': '🛍️',
      'ellipsis': '📦',
    };
    return icon ? emojiMap[icon] || '📦' : '📦';
  };

  const getMemberColor = (index: number) => {
    const colors = ['bg-blue-500', 'bg-pink-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-cyan-500'];
    return colors[index % colors.length];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">여행을 찾을 수 없습니다.</p>
        <Link href="/trips" className="text-blue-600 mt-2 inline-block">
          내 여행으로 돌아가기
        </Link>
      </div>
    );
  }

  const perPerson = trip.members.length > 0 ? trip.totalExpense / trip.members.length : 0;

  return (
    <div className="max-w-2xl mx-auto">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 min-w-0">
          <button 
            onClick={() => router.push('/trips')}
            className="p-2 hover:bg-gray-200 rounded-lg transition flex-shrink-0"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="min-w-0">
            <h1 className="font-bold text-lg truncate">{trip.title}</h1>
            {(trip.startDate || trip.endDate) && (
              <p className="text-xs text-gray-500">
                {formatDate(trip.startDate)} ~ {formatDate(trip.endDate)}
              </p>
            )}
          </div>
        </div>
        <button className="p-2 hover:bg-gray-200 rounded-lg transition flex-shrink-0">
          <Settings size={20} />
        </button>
      </div>

      {/* 초대코드 & 멤버 */}
      <div className="bg-white rounded-xl border mb-4">
        <button 
          onClick={() => setShowInvite(!showInvite)} 
          className="w-full p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Users size={18} className="text-blue-600" />
            <span className="font-medium">멤버 {trip.members.length}명</span>
          </div>
          {showInvite ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {showInvite && (
          <div className="px-4 pb-4 border-t">
            {/* 초대코드 */}
            <div className="flex items-center gap-2 mt-4 mb-4">
              <div className="flex-1 px-3 py-2 bg-gray-100 rounded-lg font-mono text-center">
                {trip.inviteCode}
              </div>
              <button 
                onClick={copyInviteCode}
                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                title="복사"
              >
                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
              <button 
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                title="공유"
              >
                <Share2 size={18} />
              </button>
            </div>
            {/* 멤버 목록 */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {trip.members.map((m, idx) => (
                <div key={m.memberId} className="flex flex-col items-center flex-shrink-0">
                  <div className={`w-10 h-10 ${getMemberColor(idx)} rounded-full flex items-center justify-center text-white font-medium`}>
                    {m.displayName[0]}
                  </div>
                  <span className="text-xs text-gray-600 mt-1 max-w-[60px] truncate">
                    {m.displayName}
                  </span>
                  {m.role === 'OWNER' && (
                    <span className="text-[10px] text-blue-600">방장</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-white p-4 rounded-xl border text-center">
          <p className="text-xs text-gray-500 mb-1">총 지출</p>
          <p className="font-bold text-lg">{formatCurrency(trip.totalExpense)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border text-center">
          <p className="text-xs text-gray-500 mb-1">1인당</p>
          <p className="font-bold text-lg">{formatCurrency(perPerson)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border text-center">
          <p className="text-xs text-gray-500 mb-1">지출 건수</p>
          <p className="font-bold text-lg">{expenses.length}건</p>
        </div>
      </div>

      {/* 탭 */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="flex border-b">
          {[
            { key: 'expenses' as const, icon: Receipt, label: '지출' },
            { key: 'stats' as const, icon: PieChart, label: '통계' },
            { key: 'settlement' as const, icon: Calculator, label: '정산' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-medium border-b-2 transition ${
                activeTab === tab.key 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* 지출 탭 */}
        {activeTab === 'expenses' && (
          <div className="p-4">
            {/* 지출 추가 버튼 */}
            <Link
              href={`/trips/${trip.id}/expenses/new`}
              className="flex items-center justify-center gap-2 w-full py-3 mb-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-600 transition"
            >
              <Plus size={20} />
              <span>지출 추가하기</span>
            </Link>

            {/* 지출 목록 */}
            {expenses.length > 0 ? (
              <div className="space-y-3">
                {expenses.map((expense) => (
                  <div 
                    key={expense.id} 
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-2xl flex-shrink-0">
                        {getCategoryEmoji(expense.category?.icon)}
                      </span>
                      <div className="min-w-0">
                        <p className="font-medium truncate">{expense.description}</p>
                        <p className="text-sm text-gray-500">
                          {expense.paidBy.displayName} · {formatDate(expense.expenseDate)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <p className="font-semibold">{formatCurrency(expense.amount)}</p>
                      <p className="text-xs text-gray-400">{expense.participantCount}명</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <Receipt size={48} className="mx-auto mb-3 opacity-30" />
                <p>아직 등록된 지출이 없어요</p>
                <p className="text-sm mt-1">위 버튼을 눌러 첫 지출을 추가해보세요!</p>
              </div>
            )}
          </div>
        )}

        {/* 통계 탭 - 추후 개발 */}
        {activeTab === 'stats' && (
          <div className="p-8 text-center">
            <PieChart size={48} className="mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500 font-medium">통계 기능</p>
            <p className="text-sm text-gray-400 mt-1">추후 개발 예정입니다</p>
          </div>
        )}

        {/* 정산 탭 - 추후 개발 */}
        {activeTab === 'settlement' && (
          <div className="p-8 text-center">
            <Calculator size={48} className="mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500 font-medium">정산 기능</p>
            <p className="text-sm text-gray-400 mt-1">추후 개발 예정입니다</p>
          </div>
        )}
      </div>
    </div>
  );
}
