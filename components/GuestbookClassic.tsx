'use client';

import { GuestbookEntry } from '@/app/types/blog';

type GuestbookClassicProps = {
  entries: GuestbookEntry[];
};

function GuestbookClassic({ entries }: GuestbookClassicProps) {
  return (
    <ul>
      {entries.map((el) => {
        return <li key={el.id}>{el.name}</li>;
      })}
    </ul>
  );
}

export default GuestbookClassic;
