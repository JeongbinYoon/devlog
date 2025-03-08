import { Html } from '@react-three/drei';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import {
  guestbookInputUserNameAtom,
  guestbookInputPasswordAtom,
  guestbookInputContentAtom,
  lastAddedEntryAtom,
} from '@/app/atoms/appAtoms';
import { addGuestbookEntry } from '@/app/guestbook/actions';

interface SubmitButtonProps {
  inputNameRef: RefObject<HTMLInputElement | null>;
  inputContentRef: RefObject<HTMLTextAreaElement | null>;
}
const SubmitButton = ({ inputNameRef, inputContentRef }: SubmitButtonProps) => {
  const [isShowSubmitButton, setIsShowSubmitButton] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<number | null>(null); // 타이머 관리

  const [inputContent, setInputContent] = useAtom(guestbookInputContentAtom);
  const [inputUserName, setInputUserName] = useAtom(guestbookInputUserNameAtom);
  const [inputPassword, setInputPassword] = useAtom(guestbookInputPasswordAtom);
  const setLastAddedEntry = useSetAtom(lastAddedEntryAtom);

  const onSubmit = async () => {
    try {
      const result = await addGuestbookEntry({
        inputContent,
        inputUserName,
        inputPassword,
      });
      setLastAddedEntry(result);
      setInputUserName('');
      setInputPassword('');
      setInputContent('');
      if (inputNameRef.current) {
        inputNameRef.current.value = '';
      }
      if (inputContentRef.current) {
        inputContentRef.current.value = '';
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message || '등록 중 오류가 발생했습니다.');
      } else {
        console.log('알 수 없는 오류', error);
      }
    }
    setIsShowSubmitButton(false);
  };

  useEffect(() => {
    // 기존 타이머 취소
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (inputContent) {
      setIsShowSubmitButton(true);
      timeoutRef.current = window.setTimeout(() => setIsAnimating(true), 10); // 트랜지션 시작
    } else {
      setIsAnimating(false);
      timeoutRef.current = window.setTimeout(
        () => setIsShowSubmitButton(false),
        500
      );
    }
  }, [inputContent]);

  // 타이머 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  return (
    isShowSubmitButton && (
      <Html position={[0, -1, 0]} scale={0.25} transform>
        <button
          onClick={onSubmit}
          style={{
            opacity: isAnimating ? 1 : 0,
            transform: `scale(${isAnimating ? 1 : 0.9})`,
            padding: '10px 20px',
            fontSize: '14px',
            background: '#f3f3f3',
            color: '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.05)',
            transition: 'opacity 500ms, transform 500ms',
          }}
        >
          작성 완료
        </button>
      </Html>
    )
  );
};

export default SubmitButton;
