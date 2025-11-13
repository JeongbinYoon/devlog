'use client';

import { getGuestbookEntries } from '@/app/guestbook/actions';
import { GuestbookEntry } from '@/app/types/blog';
import { GuestbookClassicList, GuestbookClassicWrite } from '@/components';
import { useState } from 'react';

type GuestbookClassicProps = {
  entries: GuestbookEntry[];
};

function GuestbookClassic({ entries }: GuestbookClassicProps) {
  const [entryList, setEntryList] = useState(entries);

  const onGetGuestBookEntries = async () => {
    const data = await getGuestbookEntries();
    setEntryList(data);
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 px-5 md:px-0">
      {/* <p className="text-center text-gray-400 font-bold">GUEST BOOK</p> */}
      <GuestbookClassicWrite onGetGuestBookEntries={onGetGuestBookEntries} />
      <GuestbookClassicList entries={entryList} />
    </div>
  );
}

export default GuestbookClassic;
