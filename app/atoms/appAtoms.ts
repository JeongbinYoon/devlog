import { GuestbookEntry } from '@/app/types/blog';
import { atom } from 'jotai';

export const orbitEnabledAtom = atom(true);
export const guestbookInputContentAtom = atom('');
export const guestbookInputUserNameAtom = atom('');
export const guestbookInputPasswordAtom = atom('');
export const lastAddedEntryAtom = atom<null | GuestbookEntry>(null);
