import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const VISIT_KEY = 'lastVisitDate';
  const lastVisitCookie = request.cookies.get(VISIT_KEY);
  const lastVisitDate = lastVisitCookie?.value;
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const currentDate = now.toISOString().split('T')[0];

  const response = NextResponse.next();

  // 요청이 HTML 문서인 경우만 실행
  const isHtmlRequest = request.headers.get('accept')?.includes('text/html');
  if (!isHtmlRequest) return response;

  // 쿠키 정보로 해당 날짜 방문 여부 판단 후 업데이트
  if (!lastVisitDate || currentDate > lastVisitDate) {
    try {
      response.cookies.set(VISIT_KEY, currentDate, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });

      await fetch(`${request.nextUrl.origin}/api/visit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: currentDate }),
      });
    } catch (error) {
      console.error('Route Handler 호출 오류:', error);
    }

    return response;
  }

  return response;
}
