import { create } from "zustand";

type EasterEggState = {
	easterEgg: boolean;
	setEasterEgg: (value: boolean) => void;
	toggleEasterEgg: () => void;
};

export const useEasterEggStore = create<EasterEggState>((set) => ({
	easterEgg: false,
	setEasterEgg: (value) => set({ easterEgg: value }),
	toggleEasterEgg: () => set((state) => ({ easterEgg: !state.easterEgg })),
}));
