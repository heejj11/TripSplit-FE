import { create } from 'zustand';

// 예시 스토어
interface ExampleState {
  count: number;
  increment: () => void;
}

export const useExampleStore = create<ExampleState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
