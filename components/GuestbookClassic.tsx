'use client';

import { GuestbookEntry } from '@/app/types/blog';
import {
  ChatBubbleLeftRightIcon,
  ClockIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';

type GuestbookClassicProps = {
  entries: GuestbookEntry[];
};

function GuestbookClassic({ entries }: GuestbookClassicProps) {
  const getFormattedDate = (createdAt: Date) => {
    const date = new Date(createdAt);
    const formattedDate = date
      .toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      .replace(/\. /g, '.');

    return formattedDate;
  };
  return (
    <div className="max-w-3xl mx-auto mt-12 px-5 md:px-0">
      <ul>
        {entries.map((el) => {
          return (
            <li
              key={el.id}
              className="flex mb-8 pb-8 border-b-2 border-b-gray-200 border-dashed last:border-b-0"
            >
              <div className="size-10 bg-gray-300 rounded-full"></div>
              <div className="w-fit ml-4 mt-3 pt-3 bg-neutral-100 rounded-xl relative">
                <div className="w-8 h-3 skew-x-[48deg] bg-neutral-100 absolute -left-1 -top-0"></div>
                <span className="mx-4 px-2 py-1 text-sm text-gray-200 rounded-full bg-gray-700">
                  {el.name}
                </span>
                <p className="mx-4 my-2 text-sm text-gray-700">{el.content}</p>
                <div className="flex justify-between items-center py-1 px-4 bg-gray-200 rounded-b-xl text-sm text-gray-500">
                  <p className="flex items-center">
                    <ClockIcon className="size-3 mr-1" />
                    {getFormattedDate(el.createdAt)}
                  </p>
                  <div className="flex items-center">
                    <button className="ml-10">
                      <PencilIcon className="size-4" />
                    </button>
                    <button className="ml-2">
                      <ChatBubbleLeftRightIcon className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default GuestbookClassic;
