const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// OAuth URL - 백엔드로 위임
export function getKakaoLoginUrl(): string {
  return `${API_URL}/auth/kakao`;
}

export function getGoogleLoginUrl(): string {
  return `${API_URL}/auth/google`;
}

// 토큰 저장
export function saveTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

// 토큰 가져오기
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refreshToken');
}

// 토큰 삭제
export function removeTokens(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

// 로그인 여부
export function isLoggedIn(): boolean {
  return getAccessToken() !== null;
}
