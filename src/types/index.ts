// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// 여행 목록 응답
export interface TripListItem {
  id: number;
  title: string;
  description: string | null;
  startDate: string | null;
  endDate: string | null;
  currency: string;
  memberCount: number;
  totalExpense: number;
  createdAt: string;
}

// 여행 상세 응답
export interface TripDetail {
  id: number;
  title: string;
  description: string | null;
  startDate: string | null;
  endDate: string | null;
  currency: string;
  inviteCode: string;
  members: TripMember[];
  categories: Category[];
  totalExpense: number;
  createdAt: string;
}

// 여행 멤버
export interface TripMember {
  id: number;
  memberId: number;
  nickname: string;
  displayName: string;
  profileImage: string | null;
  role: "OWNER" | "ADMIN" | "MEMBER";
  totalPaid: number;
  totalShare: number;
  balance: number;
}

// 카테고리
export interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
}

// 지출 목록
export interface ExpenseListItem {
  id: number;
  description: string;
  amount: number;
  expenseDate: string;
  category: CategoryInfo | null;
  paidBy: MemberInfo;
  splitMethod: "EQUAL" | "RATIO" | "AMOUNT" | "CUSTOM";
  participantCount: number;
  createdAt: string;
}

// 지출 상세
export interface ExpenseDetail {
  id: number;
  description: string;
  amount: number;
  expenseDate: string;
  category: CategoryInfo | null;
  paidBy: MemberInfo;
  splitMethod: "EQUAL" | "RATIO" | "AMOUNT" | "CUSTOM";
  participants: ExpenseParticipant[];
  createdAt: string;
}

export interface CategoryInfo {
  id: number;
  name: string;
  icon: string;
  color: string;
}

export interface MemberInfo {
  memberId: number;
  displayName: string;
  profileImage: string | null;
}

export interface ExpenseParticipant {
  memberId: number;
  displayName: string;
  profileImage: string | null;
  shareAmount: number;
  shareRatio: number;
}

// 여행 생성 요청
export interface CreateTripRequest {
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  currency?: string;
}

// 지출 생성 요청
export interface CreateExpenseRequest {
  description: string;
  amount: number;
  expenseDate: string;
  categoryId?: number;
  paidByMemberId: number;
  splitMethod?: "EQUAL" | "RATIO" | "AMOUNT" | "CUSTOM";
  participants?: {
    memberId: number;
    shareAmount?: number;
    shareRatio?: number;
  }[];
}
