'use client';

import { FireIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { Flag } from '@/components';

export default function Duolingo() {
  const [data, setData] = useState<any>(null);
  const [isStreakExtendedToday, setTsStreakExtendedToday] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

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

  const fetchUser = async () => {
    const res = await fetch(
      `/api/duolingo?username=${encodeURIComponent(
        `${process.env.DUOLINGO_ID}`
      )}`
    );
    const json = await res.json();
    if (!json.data?.users?.length) return;

    setData(json.data.users[0]);
  };

  return (
    <div>
      {data && (
        <>
          <div className="w-40">
            <div className="flex justify-between items-center">
              <FireIcon
                className="size-4"
                color={isStreakExtendedToday ? 'orange' : 'gray'}
              />
              <span className="text-gray-700">{data.streak} Daily streak</span>
            </div>
            <ul>
              {data.courses.map(({ id, learningLanguage, title, xp }: any) => {
                return (
                  <li key={id} className="flex justify-between items-center">
                    <Flag code={learningLanguage} alt={title} />
                    <span className="text-gray-700">{xp}xp</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      )}
    </div>
  );
}
