'use server';

import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';

type AddGuestbookEntryParams = {
  inputUserName: string;
  inputPassword: string; // 원본 비밀번호
  inputContent: string;
};

export const addGuestbookEntry = async ({
  inputUserName,
  inputPassword,
  inputContent,
}: AddGuestbookEntryParams) => {
  if (!inputUserName || !inputPassword || !inputContent) {
    throw new Error('모든 필드를 입력해야 합니다.');
  }

  try {
    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(inputPassword, 10);

    // Prisma를 통해 데이터베이스에 추가
    const result = await prisma.guestbookEntry.create({
      data: {
        name: inputUserName,
        hashedPassword,
        content: inputContent,
      },
    });
    return result;
  } catch (error) {
    console.error('방명록 추가 중 오류 발생:', error);
    throw new Error('방명록 추가 중 오류가 발생했습니다.');
  }
};
