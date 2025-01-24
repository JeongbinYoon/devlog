import { incrementVisitCount } from '@/lib/count';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const VISIT_KEY = 'lastVisit';
  const VISIT_INTERVAL = 10000; // 5초 (테스트 용)

  const res = NextResponse.next();
  const lastVisit = req.cookies.get(VISIT_KEY);
  const currentTime = Date.now();

  if (!lastVisit) {
    // 쿠키가 없으면 방문 기록을 증가시킴
  } else {
    try {
      const lastVisitTime = Number(JSON.parse(lastVisit.value)); // 쿠키 값을 숫자로 변환

      // 쿠키 만료 시 방문 기록을 증가시킴
      if (currentTime - lastVisitTime > VISIT_INTERVAL) {
        console.log('만료 시간 지남. 방문 기록을 증가.');
        await incrementVisitCount(req.nextUrl.pathname);
      } else {
        console.log('방문 기록 증가 없이 쿠키 유지');
      }
    } catch (error) {
      console.error('Error processing lastVisit cookie:', error);
    }
  }

  // 쿠키가 만료된 경우만 새 쿠키 설정
  const newExpires = currentTime + VISIT_INTERVAL;

  // 쿠키가 만료된 경우 새 쿠키 설정
  //   if (!lastVisit || currentTime - Number(lastVisit) > VISIT_INTERVAL) {
  console.log('새 쿠키 설정:', newExpires);

  // 쿠키 설정 (httpOnly, secure 등 옵션 설정)
  res.cookies.set(VISIT_KEY, newExpires.toString(), {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: VISIT_INTERVAL / 1000,
  });
  //   }

  return res;
}
