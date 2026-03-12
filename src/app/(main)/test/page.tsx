'use client';

import { Check, Clock } from 'lucide-react';

export default function SettlementTestPage() {
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

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-lg mx-auto">
        <h2 className="text-lg font-semibold mb-6">정산 현황</h2>

        {/* 내 요약 - 미니멀 */}
        <div className="flex gap-3 sm:gap-4 mb-8">
          <div className="flex-1 pb-4 border-b-2 border-blue-500">
            <p className="text-xs text-gray-400 uppercase tracking-wide">받을 돈</p>
            <p className="text-xl sm:text-2xl font-light">₩105,000</p>
          </div>
          <div className="flex-1 pb-4 border-b-2 border-gray-200">
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
        <button className="w-full mt-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition">
          송금 요청하기
        </button>
      </div>
    </div>
  );
}
