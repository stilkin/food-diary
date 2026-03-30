import { create } from 'zustand';

interface UIState {
  isActionSheetOpen: boolean;
  openActionSheet: () => void;
  closeActionSheet: () => void;
}

// TODO (core-logging): add EventsState slice for timeline data
// TODO (core-logging): add FastingState slice for fasting window

export const useAppStore = create<UIState>((set) => ({
  isActionSheetOpen: false,
  openActionSheet: () => set({ isActionSheetOpen: true }),
  closeActionSheet: () => set({ isActionSheetOpen: false }),
}));
