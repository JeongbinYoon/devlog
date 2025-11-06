'use client';

import { useAtomValue } from 'jotai';
import { GuestbookClassic, Guestbook3D } from '@/components';
import { isGuestBook3DMode } from '@/app/atoms';
import { GuestbookEntry } from '@/app/types/blog';

type GuestbookClientProps = {
  entries: GuestbookEntry[];
};

const GuestbookClient = ({ entries }: GuestbookClientProps) => {
  const is3DMode = useAtomValue(isGuestBook3DMode);

  return is3DMode ? <Guestbook3D /> : <GuestbookClassic entries={entries} />;
};
export default GuestbookClient;
