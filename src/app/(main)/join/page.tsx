'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Link2, Users, Calendar, Plane } from 'lucide-react';

export default function JoinTripPage() {
  const router = useRouter();
  const [inviteCode, setInviteCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tripInfo, setTripInfo] = useState<{
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    memberCount: number;
    members: { id: number; name: string; color: string }[];
  } | null>(null);

  const handleSearch = () => {
    if (!inviteCode.trim()) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setTripInfo({
        id: 1,
        title: '제주도 여행',
        startDate: '2024-03-15',
        endDate: '2024-03-18',
        memberCount: 3,
        members: [
          { id: 1, name: '김철수', color: 'bg-blue-500' },
          { id: 2, name: '이영희', color: 'bg-pink-500' },
          { id: 3, name: '박민수', color: 'bg-green-500' },
        ],
      });
      setIsLoading(false);
    }, 500);
  };

  const handleJoin = () => {
    router.push(`/trips/${tripInfo?.id}`);
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
        <h1 className="text-lg sm:text-xl font-bold">초대코드로 참여</h1>
      </div>

      {/* 아이콘 */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center">
          <Link2 size={32} className="text-blue-600 sm:w-10 sm:h-10" />
        </div>
      </div>

      {/* 설명 */}
      <div className="text-center mb-6">
        <p className="text-gray-600 text-sm sm:text-base">
          친구에게 받은 초대코드를 입력하고
          <br />
          여행에 함께 참여하세요!
        </p>
      </div>

      {/* 초대코드 입력 */}
      <div className="bg-white p-4 rounded-xl border mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">초대코드</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
            placeholder="예: ABC123"
            className="flex-1 px-4 py-3 text-center text-lg sm:text-xl font-mono tracking-widest border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase"
            maxLength={6}
          />
          <button
            onClick={handleSearch}
            disabled={!inviteCode.trim() || isLoading}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isLoading ? '...' : '조회'}
          </button>
        </div>
      </div>

      {/* 여행 정보 카드 */}
      {tripInfo && (
        <div className="bg-white rounded-xl border overflow-hidden mb-4">
          <div className="bg-blue-600 p-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <Plane size={18} />
              <span className="text-sm opacity-80">여행 초대</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold">{tripInfo.title}</h2>
          </div>

          <div className="p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-3">
              <Calendar size={16} />
              <span className="text-sm">{tripInfo.startDate} ~ {tripInfo.endDate}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <Users size={16} />
              <span className="text-sm">현재 {tripInfo.memberCount}명 참여중</span>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs text-gray-500 mb-3">참여중인 멤버</p>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {tripInfo.members.map((member) => (
                  <div key={member.id} className="flex flex-col items-center flex-shrink-0">
                    <div className={`w-10 h-10 ${member.color} rounded-full flex items-center justify-center text-white font-medium`}>
                      {member.name[0]}
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{member.name}</span>
                  </div>
                ))}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-10 h-10 border-2 border-dashed border-blue-400 rounded-full flex items-center justify-center text-blue-400 font-medium text-sm">
                    나
                  </div>
                  <span className="text-xs text-blue-500 mt-1">참여하기</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 border-t">
            <button
              onClick={handleJoin}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
            >
              이 여행에 참여하기
            </button>
          </div>
        </div>
      )}

      {/* 안내 */}
      <div className="bg-gray-100 p-4 rounded-xl">
        <p className="text-sm text-gray-600 text-center">
          초대코드는 여행 생성자 또는 참여자에게
          <br />
          공유받을 수 있어요
        </p>
      </div>
    </div>
  );
}
