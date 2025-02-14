'use client';

import { useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import { usePathname } from 'next/navigation';

const VisitTracker = () => {
  const VISIT_KEY = 'lastVisitDate';
  const pathName = usePathname();

  useEffect(() => {
    const now = new Date();
    const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC → KST 변환
    const currentDate = `${koreaTime.getFullYear()}-${String(
      koreaTime.getMonth() + 1
    ).padStart(2, '0')}-${String(koreaTime.getDate()).padStart(2, '0')}`;

    const lastVisitDate = getCookie(VISIT_KEY);

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1); // 1일 후
    expiryDate.setUTCHours(15, 0, 0, 0); // UTC 기준으로 한국(KST) 자정 설정

    if (!lastVisitDate || currentDate > lastVisitDate) {
      // 방문 기록이 없거나 날짜가 다르면 새로 업데이트
      fetch('/api/visit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: currentDate }),
      })
        .then(() => {
          setCookie(VISIT_KEY, currentDate, {
            expires: expiryDate,
            sameSite: 'lax',
          });
        })
        .catch((err) => console.error('방문 기록 업데이트 실패:', err));
    }
  }, [pathName]);

  return null;
};

export default VisitTracker;
