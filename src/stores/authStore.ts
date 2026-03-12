import { create } from "zustand";
import { fetchApi } from "@/lib/api";
import { saveTokens, removeTokens, getAccessToken } from "@/lib/auth";

interface User {
  id: number;
  email: string;
  nickname: string;
  profileImage?: string;
  provider: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;

  // Actions
  setUser: (user: User | null) => void;
  login: (accessToken: string, refreshToken: string, user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isLoggedIn: false,

  setUser: (user) => set({ user, isLoggedIn: !!user }),

  login: (accessToken, refreshToken, user) => {
    saveTokens(accessToken, refreshToken);
    set({ user, isLoggedIn: true, isLoading: false });
  },

  logout: async () => {
    try {
      await fetchApi("/auth/logout", { method: "POST" });
    } catch (e) {
      // 에러 무시
    } finally {
      removeTokens();
      set({ user: null, isLoggedIn: false });
      window.location.href = "/login";
    }
  },

  checkAuth: async () => {
    const token = getAccessToken();

    if (!token) {
      set({ user: null, isLoggedIn: false, isLoading: false });
      return;
    }

    try {
      const response = await fetchApi<{ data: User }>("/auth/me");
      set({ user: response.data, isLoggedIn: true, isLoading: false });
    } catch {
      removeTokens();
      set({ user: null, isLoggedIn: false, isLoading: false });
    }
  },
}));
