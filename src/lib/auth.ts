// OAuth URL 생성
export function getKakaoLoginUrl(): string {
  const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  const params = new URLSearchParams({
    client_id: clientId || "",
    redirect_uri: redirectUri || "",
    response_type: "code",
  });

  return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
}

export function getGoogleLoginUrl(): string {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

  const params = new URLSearchParams({
    client_id: clientId || "",
    redirect_uri: redirectUri || "",
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent",
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

// 토큰 저장
export function saveTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

// 토큰 가져오기
export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refreshToken");
}

// 토큰 삭제
export function removeTokens(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

// 로그인 여부
export function isLoggedIn(): boolean {
  return getAccessToken() !== null;
}
