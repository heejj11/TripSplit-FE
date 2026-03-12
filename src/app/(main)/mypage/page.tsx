'use client';

import { useState } from 'react';
import { User, Mail, Lock, LogOut, ChevronRight, Bell, Moon, Globe, Trash2 } from 'lucide-react';

export default function MyPage() {
  const [user] = useState({
    nickname: '김철수',
    email: 'kim@example.com',
    profileColor: 'bg-blue-500',
  });

  const menuItems = [
    { 
      section: '계정',
      items: [
        { icon: User, label: '프로필 수정', href: '/mypage/profile' },
        { icon: Lock, label: '비밀번호 변경', href: '/mypage/password' },
      ]
    },
    {
      section: '설정',
      items: [
        { icon: Bell, label: '알림 설정', toggle: true, enabled: true },
        { icon: Moon, label: '다크 모드', toggle: true, enabled: false },
        { icon: Globe, label: '언어', value: '한국어' },
      ]
    },
    {
      section: '기타',
      items: [
        { icon: Mail, label: '문의하기', href: '/contact' },
        { icon: Trash2, label: '회원 탈퇴', href: '/mypage/delete', danger: true },
      ]
    },
  ];

  const stats = [
    { label: '참여 여행', value: 12 },
    { label: '등록 지출', value: 48 },
    { label: '정산 완료', value: 8 },
  ];

  return (
    <div className="max-w-lg mx-auto">
      {/* 프로필 카드 */}
      <div className="bg-white rounded-xl border p-4 sm:p-6 mb-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className={`w-14 h-14 sm:w-16 sm:h-16 ${user.profileColor} rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold flex-shrink-0`}>
            {user.nickname[0]}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-bold truncate">{user.nickname}</h2>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>
          <button className="px-2 sm:px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition flex-shrink-0">
            편집
          </button>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 메뉴 */}
      {menuItems.map((group) => (
        <div key={group.section} className="mb-4">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider px-1 mb-2">
            {group.section}
          </h3>
          <div className="bg-white rounded-xl border divide-y">
            {group.items.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 transition ${
                  item.danger ? 'text-red-600' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} className={item.danger ? 'text-red-500' : 'text-gray-500'} />
                  <span className="font-medium text-sm sm:text-base">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.value && (
                    <span className="text-sm text-gray-500">{item.value}</span>
                  )}
                  {item.toggle ? (
                    <div className={`w-10 h-6 rounded-full relative transition ${
                      item.enabled ? 'bg-blue-600' : 'bg-gray-300'
                    }`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition ${
                        item.enabled ? 'right-1' : 'left-1'
                      }`} />
                    </div>
                  ) : (
                    <ChevronRight size={18} className="text-gray-400" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* 로그아웃 */}
      <button className="w-full flex items-center justify-center gap-2 p-3 sm:p-4 bg-white rounded-xl border text-gray-600 hover:bg-gray-50 transition">
        <LogOut size={20} />
        <span className="font-medium">로그아웃</span>
      </button>

      {/* 버전 */}
      <p className="text-center text-xs text-gray-400 mt-6">
        TripSplit v1.0.0
      </p>
    </div>
  );
}
