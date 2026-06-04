import { create } from "zustand";

type EasterEggState = {
    easterEgg: boolean;
    watchdogs: boolean;
    setEasterEgg: (value: boolean) => void;
    toggleEasterEgg: () => void;
    setWatchdogs: (value: boolean) => void;
};

export const useEasterEggStore = create<EasterEggState>((set) => ({
    easterEgg: false,
    watchdogs: false,
    setEasterEgg: (value) => set({ easterEgg: value, ...(value ? { watchdogs: false } : {}) }),
    toggleEasterEgg: () => set((state) => ({ easterEgg: !state.easterEgg, watchdogs: false })),
    setWatchdogs: (value) => set({ watchdogs: value, ...(value ? { easterEgg: false } : {}) }),
}));
