const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

// 토큰 가져오기
const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
};

// 기본 fetch wrapper
export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getAccessToken();

  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);

  // 401 에러 시 토큰 삭제 & 로그인 페이지로
  if (response.status === 401) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
    throw new Error("인증이 만료되었습니다");
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "API 요청 실패");
  }

  return response.json();
}

export { API_URL };
