import { atom } from 'jotai';

export const isSidebarOpenAtom = atom(false);

// 좋아요
export const likeClickCountAtom = atom(0);
export const floatingTextsAtom = atom<string[]>([]);
export const isShakeAtom = atom(false);
