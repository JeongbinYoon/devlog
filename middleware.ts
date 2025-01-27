import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const VISIT_KEY = 'lastVisitDate';
  const lastVisitCookie = request.cookies.get(VISIT_KEY);
  const lastVisitDate = lastVisitCookie?.value;
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];

  const response = NextResponse.next();

  // 요청이 HTML 문서인 경우만 실행
  const isHtmlRequest = request.headers.get('accept')?.includes('text/html');
  if (!isHtmlRequest) return response;

  // 날짜 비교를 위해 Date 객체로 변환
  const lastVisitDateTime = lastVisitDate ? new Date(lastVisitDate) : null;
  const currentDateTime = new Date(currentDate);

  console.log({
    environment: process.env.NODE_ENV,
    lastVisitDateTime,
    currentDateTime,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  // 쿠키가 없거나, 마지막 방문일이 현재 날짜보다 이전인 경우
  if (!lastVisitDateTime || lastVisitDateTime < currentDateTime) {
    try {
      response.cookies.set(VISIT_KEY, currentDate, {
        httpOnly: true,
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'production',
      });

      fetch(`${request.nextUrl.origin}/api/visit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: currentDate }),
      });
    } catch (error) {
      console.error('Route Handler 호출 오류:', error);
    }
  }

  return response;
}
