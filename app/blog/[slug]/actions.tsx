'use server';

import { prisma } from '@/lib/prisma';

interface CountUp {
  postId: string;
}

// 좋아요 눌렀을 때 레코드 존재 시 +1, 아닌경우 create
export const countUp = async ({ postId }: CountUp) => {
  return await prisma.like.upsert({
    where: { postId }, // postId가 고유 필드여야 합니다.
    update: {
      count: {
        increment: 1,
      },
    },
    create: {
      postId,
      count: 1,
    },
  });
};
