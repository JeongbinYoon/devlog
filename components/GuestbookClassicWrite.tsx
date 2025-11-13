'use client';

import { addGuestbookEntry } from '@/app/guestbook/actions';
import {
  guestbookInputUserNameAtom,
  guestbookInputPasswordAtom,
  guestbookInputContentAtom,
} from '@/app/atoms/appAtoms';
import { useRef, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';

type GuestbookClassicWriteProps = {
  onGetGuestBookEntries: () => void;
};

function GuestbookClassicWrite({
  onGetGuestBookEntries,
}: GuestbookClassicWriteProps) {
  const [inputContent, setInputContent] = useAtom(guestbookInputContentAtom);
  const [inputUserName, setInputUserName] = useAtom(guestbookInputUserNameAtom);
  const [inputPassword, setInputPassword] = useAtom(guestbookInputPasswordAtom);

  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputContentRef = useRef<HTMLTextAreaElement>(null);

  const handleClear = () => {
    setInputUserName('');
    setInputPassword('');
    setInputContent('');
    if (inputNameRef.current) {
      inputNameRef.current.value = '';
    }
    if (inputPasswordRef.current) {
      inputPasswordRef.current.value = '';
    }
    if (inputContentRef.current) {
      inputContentRef.current.value = '';
    }
  };

  const onSubmit = async () => {
    try {
      await addGuestbookEntry({
        inputContent,
        inputUserName,
        inputPassword,
      });

      handleClear();

      onGetGuestBookEntries();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message || '등록 중 오류가 발생했습니다.');
      } else {
        console.log('알 수 없는 오류', error);
      }
    }
  };

  return (
    <div className="flex flex-col w-full mb-8 px-4 py-4 bg-neutral-100 rounded-xl">
      <div className="flex gap-3">
        <input
          ref={inputNameRef}
          type="text"
          className="px-2 py-2 text-sm text-gray-100 rounded-xl bg-gray-500"
          placeholder="이름"
          onChange={(e) => setInputUserName(e.target.value)}
        />
        <input
          ref={inputPasswordRef}
          type="text"
          className="px-2 py-2 text-sm text-gray-100 rounded-xl bg-gray-500"
          placeholder="비밀번호"
          onChange={(e) => setInputPassword(e.target.value)}
        />
      </div>

      <textarea
        ref={inputContentRef}
        className="w-full h-24 mt-3 px-2 py-2 text-sm text-gray-700 rounded-xl bg-gray-200"
        placeholder="안녕하세요"
        onChange={(e) => setInputContent(e.target.value)}
      />

      <button
        className="ml-auto mt-4 px-2 py-1 bg-gray-700 text-sm text-gray-200 rounded-md"
        onClick={onSubmit}
      >
        등록하기
      </button>
    </div>
  );
}

export default GuestbookClassicWrite;
