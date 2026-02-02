// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
