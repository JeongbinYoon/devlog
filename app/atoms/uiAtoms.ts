import { atom } from 'jotai';

export const isSidebarOpenAtom = atom(false);

// 좋아요
export const likeClickCountAtom = atom(0);
export const likesCountAtom = atom(0);
export const isMaxLikeAttemptAtom = atom(false);
export const floatingTextsAtom = atom<string[]>([]);
export const isShakeAtom = atom(false);

export const isGuestBook3DMode = atom(true);
