'use client';

import { FireIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { Flag } from '@/components';

type DuolingoProps = {
  userData: any;
};
export default function Duolingo({ userData: data }: DuolingoProps) {
  const [isStreakExtendedToday, setTsStreakExtendedToday] = useState(false);

  useEffect(() => {
    if (data) {
      const currentStreakEndDate = data.streakData.currentStreak.endDate;
      const [year, month, day] = currentStreakEndDate.split('-').map(Number);
      const endDate = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      setTsStreakExtendedToday(endDate >= today);
    }
  }, [data, setTsStreakExtendedToday]);

  return (
    data && (
      <div className="w-40 ml-auto">
        <p className="mb-1 text-xl text-green-500 font-extrabold">Duolingo</p>
        <div className="flex justify-between items-center">
          <FireIcon
            className="size-5 transition-colors duration-700"
            color={isStreakExtendedToday ? 'orange' : 'gray'}
          />
          <span className="text-gray-500">{data.streak} Daily streak</span>
        </div>
        <ul>
          {data.courses.map(({ id, learningLanguage, title, xp }: any) => {
            return (
              <li key={id} className="flex justify-between items-center">
                <Flag code={learningLanguage} alt={title} />
                <span className="text-gray-500">{xp}xp</span>
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
}
