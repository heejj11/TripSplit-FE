'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Settings, Copy, Share2, Users, Receipt, 
  PieChart, ChevronDown, ChevronUp, Plus, Calculator, Check, Clock 
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
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-200 rounded-lg transition flex-shrink-0"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="min-w-0">
            <h1 className="font-bold truncate">{trip.title}</h1>
            <p className="text-xs text-gray-500">
              {formatDate(trip.startDate)} ~ {formatDate(trip.endDate)}
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-200 rounded-lg transition flex-shrink-0">
          <Settings size={20} />
        </button>
      </div>

      {/* 초대코드 */}
      <div className="bg-white rounded-xl border mb-3">
        <button 
          onClick={() => setShowInvite(!showInvite)} 
          className="w-full p-3 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Users size={18} className="text-blue-600" />
            <span className="font-medium text-sm">초대코드 · {trip.members.length}명</span>
          </div>
          {showInvite ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {showInvite && (
          <div className="px-3 pb-3 border-t">
            <div className="flex items-center gap-2 mt-3 mb-3">
              <div className="flex-1 px-3 py-2 bg-gray-100 rounded-lg font-mono text-center text-sm sm:text-base">
                {trip.inviteCode}
              </div>
              <button 
                onClick={copyInviteCode}
                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
              <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Share2 size={18} />
              </button>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {trip.members.map((m, idx) => (
                <div key={m.memberId} className="flex flex-col items-center flex-shrink-0">
                  <div className={`w-9 h-9 ${getMemberColor(idx)} rounded-full flex items-center justify-center text-white text-sm font-medium`}>
                    {m.displayName[0]}
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{m.displayName}</span>
                </div>
              ))}
              <button className="w-9 h-9 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-400 transition flex-shrink-0">
                <Plus size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 요약 */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3">
        <div className="bg-white p-2 sm:p-3 rounded-xl border text-center">
          <p className="text-xs text-gray-500">총 지출</p>
          <p className="font-bold text-sm sm:text-base">{formatCurrency(trip.totalExpense)}</p>
        </div>
        <div className="bg-white p-2 sm:p-3 rounded-xl border text-center">
          <p className="text-xs text-gray-500">1인당</p>
          <p className="font-bold text-sm sm:text-base">{formatCurrency(perPerson)}</p>
        </div>
        <div className="bg-white p-2 sm:p-3 rounded-xl border text-center">
          <p className="text-xs text-gray-500">내 정산</p>
          <p className="font-bold text-blue-600 text-sm sm:text-base">
            {trip.members[0]?.balance > 0 ? '+' : ''}{formatCurrency(trip.members[0]?.balance || 0)}
          </p>
        </div>
      </div>

      {/* 탭 */}
      <div className="bg-white rounded-xl border">
        <div className="flex border-b">
          {[
            { key: 'expenses' as const, icon: Receipt, label: '지출' },
            { key: 'stats' as const, icon: PieChart, label: '통계' },
            { key: 'settlement' as const, icon: Calculator, label: '정산' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-1 py-2.5 text-sm border-b-2 transition ${
                activeTab === tab.key ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* 지출 탭 */}
        {activeTab === 'expenses' && (
          <div className="p-3">
            <div className="flex justify-between items-center mb-3">
              <p className="text-xs text-gray-500">{expenses.length}건</p>
              <Link
                href={`/trips/${trip.id}/expenses/new`}
                className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition"
              >
                <Plus size={14} />추가
              </Link>
            </div>
            {expenses.length > 0 ? (
              <div className="space-y-2">
                {expenses.map((e) => (
                  <div 
                    key={e.id} 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-xl flex-shrink-0">
                        {getCategoryEmoji(e.category?.icon)}
                      </span>
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{e.description}</p>
                        <p className="text-xs text-gray-500">
                          {e.paidBy.displayName} · {formatDate(e.expenseDate)}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-sm flex-shrink-0 ml-2">
                      {formatCurrency(e.amount)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Receipt size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">아직 지출이 없어요</p>
              </div>
            )}
          </div>
        )}

        {/* 통계 탭 */}
        {activeTab === 'stats' && (
          <div className="p-8 text-center text-gray-400 text-sm">
            📊 카테고리별 지출 통계<br/>(차트 영역)
          </div>
        )}

        {/* 정산 탭 */}
        {activeTab === 'settlement' && (
          <div className="p-3 sm:p-4">
            {/* 멤버별 정산 현황 */}
            <div className="space-y-3">
              {trip.members.map((member, idx) => (
                <div key={member.memberId} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${getMemberColor(idx)} rounded-full flex items-center justify-center text-white font-medium`}>
                      {member.displayName[0]}
                    </div>
                    <div>
                      <p className="font-medium">{member.displayName}</p>
                      <p className="text-xs text-gray-500">
                        지출: {formatCurrency(member.totalPaid)} · 부담: {formatCurrency(member.totalShare)}
                      </p>
                    </div>
                  </div>
                  <p className={`font-semibold ${member.balance > 0 ? 'text-blue-600' : member.balance < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                    {member.balance > 0 ? '+' : ''}{formatCurrency(member.balance)}
                  </p>
                </div>
              ))}
            </div>

            {/* 버튼 */}
            <button className="w-full mt-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition">
              송금 요청하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
