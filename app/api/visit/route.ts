import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { date } = await request.json();
    const todayDate = await prisma.visitCount.findFirst({
      where: { date: date },
    });

    if (todayDate) {
      await prisma.visitCount.update({
        where: { date },
        data: { count: todayDate.count + 1 },
      });
    } else {
      await prisma.visitCount.create({
        data: { date, count: 1 },
      });
    }
    console.log('업데이트!!');
    return NextResponse.json({ message: '방문 기록 업데이트 완료' });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : '알 수 없는 오류';
    console.error('방문 카운트 업데이트 오류:', errorMessage);

    return NextResponse.json(
      { message: '방문 기록 업데이트에 실패', error: errorMessage },
      { status: 500 }
    );
  }
}
