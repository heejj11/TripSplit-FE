'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Users, Plane } from 'lucide-react';

export default function TripCreatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    currency: 'KRW',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('여행 생성:', formData);
    router.push('/trips/1');
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
        <h1 className="text-lg sm:text-xl font-bold">새 여행 만들기</h1>
      </div>

      {/* 아이콘 */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center">
          <Plane size={32} className="text-blue-600 sm:w-10 sm:h-10" />
        </div>
      </div>

      {/* 폼 */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white p-4 rounded-xl border">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            여행 이름 *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="예: 제주도 여행"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            required
          />
        </div>

        <div className="bg-white p-4 rounded-xl border">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            설명 (선택)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="여행에 대한 간단한 설명"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
          />
        </div>

        <div className="bg-white p-4 rounded-xl border">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              여행 기간 *
            </div>
          </label>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <span className="text-gray-400 text-center">~</span>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            기본 통화
          </label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          >
            <option value="KRW">🇰🇷 원화 (KRW)</option>
            <option value="USD">🇺🇸 달러 (USD)</option>
            <option value="EUR">🇪🇺 유로 (EUR)</option>
            <option value="JPY">🇯🇵 엔화 (JPY)</option>
          </select>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <div className="flex items-start gap-3">
            <Users size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-800">여행을 만들면 초대 코드가 생성됩니다</p>
              <p className="text-xs text-blue-600 mt-1">친구들에게 초대 코드를 공유해서 함께 여행을 관리하세요!</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
        >
          여행 만들기
        </button>
      </form>
    </div>
  );
}
