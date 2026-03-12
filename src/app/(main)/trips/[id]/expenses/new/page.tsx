'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Check } from 'lucide-react';

export default function ExpenseCreatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    amount: '',
    title: '',
    categoryId: 1,
    paidBy: 1,
    expenseDate: '',
    splitType: 'EQUAL',
    memo: '',
  });

  const [participants, setParticipants] = useState([
    { userId: 1, name: '김철수', selected: true },
    { userId: 2, name: '이영희', selected: true },
    { userId: 3, name: '박민수', selected: true },
    { userId: 4, name: '최지연', selected: true },
  ]);

  const categories = [
    { id: 1, name: '숙소', emoji: '🏨' },
    { id: 2, name: '식비', emoji: '🍽️' },
    { id: 3, name: '교통', emoji: '🚗' },
    { id: 4, name: '관광', emoji: '🎡' },
    { id: 5, name: '쇼핑', emoji: '🛍️' },
    { id: 6, name: '기타', emoji: '📌' },
  ];

  const members = [
    { id: 1, name: '김철수', color: 'bg-blue-500' },
    { id: 2, name: '이영희', color: 'bg-pink-500' },
    { id: 3, name: '박민수', color: 'bg-green-500' },
    { id: 4, name: '최지연', color: 'bg-purple-500' },
  ];

  const splitTypes = [
    { value: 'EQUAL', label: '균등 분배', desc: '모두 똑같이 나눠요' },
    { value: 'RATIO', label: '비율 분배', desc: '비율대로 나눠요' },
    { value: 'AMOUNT', label: '금액 지정', desc: '직접 입력해요' },
    { value: 'CUSTOM', label: '일부 제외', desc: '참여자만 나눠요' },
  ];

  const toggleParticipant = (userId: number) => {
    setParticipants(prev => prev.map(p => 
      p.userId === userId ? { ...p, selected: !p.selected } : p
    ));
  };

  const selectedCount = participants.filter(p => p.selected).length;
  const amountPerPerson = formData.amount && selectedCount > 0 
    ? Math.round(Number(formData.amount) / selectedCount) 
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('지출 등록:', formData, participants);
    router.back();
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-200 rounded-lg transition"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg sm:text-xl font-bold">지출 추가</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 금액 */}
        <div className="bg-white p-4 rounded-xl border">
          <label className="block text-sm font-medium text-gray-700 mb-2">금액 *</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">₩</span>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="0"
              className="w-full pl-10 pr-4 py-4 text-xl sm:text-2xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
        </div>

        {/* 내용 */}
        <div className="bg-white p-4 rounded-xl border">
          <label className="block text-sm font-medium text-gray-700 mb-2">내용 *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="무엇에 사용했나요?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        {/* 카테고리 */}
        <div className="bg-white p-4 rounded-xl border">
          <label className="block text-sm font-medium text-gray-700 mb-3">카테고리</label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, categoryId: cat.id }))}
                className={`p-2 sm:p-3 rounded-lg border-2 transition flex flex-col items-center gap-1 ${
                  formData.categoryId === cat.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-xl sm:text-2xl">{cat.emoji}</span>
                <span className="text-xs">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 결제자 */}
        <div className="bg-white p-4 rounded-xl border">
          <label className="block text-sm font-medium text-gray-700 mb-3">누가 결제했나요?</label>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {members.map((member) => (
              <button
                key={member.id}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, paidBy: member.id }))}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg border-2 min-w-16 transition flex-shrink-0 ${
                  formData.paidBy === member.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'
                }`}
              >
                <div className={`w-10 h-10 ${member.color} rounded-full flex items-center justify-center text-white font-medium`}>
                  {member.name[0]}
                </div>
                <span className="text-xs">{member.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 날짜 */}
        <div className="bg-white p-4 rounded-xl border">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              지출 날짜
            </div>
          </label>
          <input
            type="date"
            value={formData.expenseDate}
            onChange={(e) => setFormData(prev => ({ ...prev, expenseDate: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* 정산 방식 */}
        <div className="bg-white p-4 rounded-xl border">
          <label className="block text-sm font-medium text-gray-700 mb-3">정산 방식</label>
          <div className="grid grid-cols-2 gap-2">
            {splitTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, splitType: type.value }))}
                className={`p-2 sm:p-3 rounded-lg border-2 text-left transition ${
                  formData.splitType === type.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-medium text-xs sm:text-sm">{type.label}</p>
                <p className="text-xs text-gray-500 hidden sm:block">{type.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* 참여자 선택 */}
        <div className="bg-white p-4 rounded-xl border">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-gray-700">참여자 선택</label>
            <span className="text-xs text-gray-500">{selectedCount}명 선택됨</span>
          </div>
          <div className="space-y-2">
            {participants.map((p) => {
              const member = members.find(m => m.id === p.userId);
              return (
                <button
                  key={p.userId}
                  type="button"
                  onClick={() => toggleParticipant(p.userId)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition ${
                    p.selected 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${member?.color} rounded-full flex items-center justify-center text-white text-sm`}>
                      {p.name[0]}
                    </div>
                    <span className={p.selected ? 'font-medium' : 'text-gray-500'}>{p.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.selected && formData.amount && (
                      <span className="text-sm font-medium text-blue-600">
                        ₩{amountPerPerson.toLocaleString()}
                      </span>
                    )}
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      p.selected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                    }`}>
                      {p.selected && <Check size={14} className="text-white" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 메모 */}
        <div className="bg-white p-4 rounded-xl border">
          <label className="block text-sm font-medium text-gray-700 mb-2">메모 (선택)</label>
          <textarea
            value={formData.memo}
            onChange={(e) => setFormData(prev => ({ ...prev, memo: e.target.value }))}
            placeholder="추가로 기록하고 싶은 내용"
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
        </div>

        {/* 저장 버튼 */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
        >
          저장하기
        </button>
      </form>
    </div>
  );
}
