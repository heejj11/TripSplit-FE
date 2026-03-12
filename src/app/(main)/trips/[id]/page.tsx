'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Settings, Copy, Share2, Users, Receipt, 
  PieChart, ChevronDown, ChevronUp, Plus, Calculator, Check, Clock 
} from 'lucide-react';

export default function TripDetailPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'expenses' | 'stats' | 'settlement'>('expenses');
  const [showInvite, setShowInvite] = useState(false);

  const trip = {
    id: 1,
    title: '제주도 여행',
    startDate: '2024-03-15',
    endDate: '2024-03-18',
    inviteCode: 'ABC123',
    memberCount: 4,
    totalExpense: 630000,
  };

  const members = [
    { id: 1, name: '김철수', color: 'bg-blue-500' },
    { id: 2, name: '이영희', color: 'bg-pink-500' },
    { id: 3, name: '박민수', color: 'bg-green-500' },
    { id: 4, name: '최지연', color: 'bg-purple-500' },
  ];

  const expenses = [
    { id: 1, title: '숙소 예약', amount: 400000, paidBy: '김철수', category: '🏨', date: '03.15' },
    { id: 2, title: '점심 식사', amount: 80000, paidBy: '이영희', category: '🍽️', date: '03.15' },
    { id: 3, title: '렌터카', amount: 150000, paidBy: '박민수', category: '🚗', date: '03.15' },
  ];

  const settlementGroups = [
    {
      receiver: { id: 1, name: '김철수', color: '#3B82F6' },
      totalAmount: 105000,
      settlements: [
        { id: 1, from: { id: 2, name: '이영희', color: '#EC4899' }, amount: 50000, status: 'PENDING' as const },
        { id: 2, from: { id: 3, name: '박민수', color: '#22C55E' }, amount: 30000, status: 'COMPLETED' as const },
        { id: 3, from: { id: 4, name: '최지연', color: '#A855F7' }, amount: 25000, status: 'PENDING' as const },
      ]
    },
    {
      receiver: { id: 3, name: '박민수', color: '#22C55E' },
      totalAmount: 20000,
      settlements: [
        { id: 4, from: { id: 2, name: '이영희', color: '#EC4899' }, amount: 20000, status: 'PENDING' as const },
      ]
    },
  ];

  const currentUserId = 1;

  const copyInviteCode = () => {
    navigator.clipboard.writeText(trip.inviteCode);
    alert('초대코드가 복사되었습니다!');
  };

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
            <p className="text-xs text-gray-500">{trip.startDate} ~ {trip.endDate}</p>
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
            <span className="font-medium text-sm">초대코드 · {trip.memberCount}명</span>
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
                <Copy size={18} />
              </button>
              <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Share2 size={18} />
              </button>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {members.map((m) => (
                <div key={m.id} className="flex flex-col items-center flex-shrink-0">
                  <div className={`w-9 h-9 ${m.color} rounded-full flex items-center justify-center text-white text-sm font-medium`}>
                    {m.name[0]}
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{m.name}</span>
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
          <p className="font-bold text-sm sm:text-base">₩{trip.totalExpense.toLocaleString()}</p>
        </div>
        <div className="bg-white p-2 sm:p-3 rounded-xl border text-center">
          <p className="text-xs text-gray-500">1인당</p>
          <p className="font-bold text-sm sm:text-base">₩{(trip.totalExpense / 4).toLocaleString()}</p>
        </div>
        <div className="bg-white p-2 sm:p-3 rounded-xl border text-center">
          <p className="text-xs text-gray-500">내 정산</p>
          <p className="font-bold text-blue-600 text-sm sm:text-base">+₩105,000</p>
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
            <div className="space-y-2">
              {expenses.map((e) => (
                <div 
                  key={e.id} 
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xl flex-shrink-0">{e.category}</span>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{e.title}</p>
                      <p className="text-xs text-gray-500">{e.paidBy} · {e.date}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-sm flex-shrink-0 ml-2">₩{e.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 통계 탭 */}
        {activeTab === 'stats' && (
          <div className="p-8 text-center text-gray-400 text-sm">
            📊 카테고리별 지출 통계<br/>(차트 영역)
          </div>
        )}

        {/* 정산 탭 - 미니멀 스타일 */}
        {activeTab === 'settlement' && (
          <div className="p-3 sm:p-4">
            {/* 내 요약 */}
            <div className="flex gap-3 sm:gap-4 mb-6">
              <div className="flex-1 pb-3 border-b-2 border-blue-500">
                <p className="text-xs text-gray-400 uppercase tracking-wide">받을 돈</p>
                <p className="text-xl sm:text-2xl font-light">₩105,000</p>
              </div>
              <div className="flex-1 pb-3 border-b-2 border-gray-200">
                <p className="text-xs text-gray-400 uppercase tracking-wide">보낼 돈</p>
                <p className="text-xl sm:text-2xl font-light text-gray-400">₩0</p>
              </div>
            </div>

            {/* 정산 목록 */}
            <div className="space-y-6">
              {settlementGroups.map((group) => {
                const isMyGroup = group.receiver.id === currentUserId;
                const completedCount = group.settlements.filter(s => s.status === 'COMPLETED').length;
                
                return (
                  <div key={group.receiver.id}>
                    {/* 헤더 */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
                          style={{ backgroundColor: group.receiver.color }}
                        >
                          {group.receiver.name[0]}
                        </div>
                        <div>
                          <p className="font-medium">
                            {group.receiver.name}
                            {isMyGroup && <span className="text-blue-500 text-sm ml-2">← 나</span>}
                          </p>
                          <p className="text-xs text-gray-400">{completedCount}/{group.settlements.length} 완료</p>
                        </div>
                      </div>
                      <p className="text-base sm:text-lg font-semibold">₩{group.totalAmount.toLocaleString()}</p>
                    </div>

                    {/* 리스트 */}
                    <div className="ml-5 pl-6 sm:pl-8 border-l-2 border-gray-100 space-y-0">
                      {group.settlements.map((s, idx) => (
                        <div 
                          key={s.id}
                          className={`flex items-center justify-between py-3 ${
                            idx !== group.settlements.length - 1 ? 'border-b border-gray-50' : ''
                          }`}
                        >
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div 
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-xs"
                              style={{ backgroundColor: s.from.color }}
                            >
                              {s.from.name[0]}
                            </div>
                            <span className="text-sm">{s.from.name}</span>
                          </div>
                          <div className="flex items-center gap-2 sm:gap-3">
                            <span className="font-medium text-sm">₩{s.amount.toLocaleString()}</span>
                            {s.status === 'COMPLETED' ? (
                              <Check size={16} className="text-green-500" />
                            ) : (
                              <Clock size={16} className="text-gray-300" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
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
