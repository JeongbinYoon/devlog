import { Html } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { useAtomValue } from 'jotai';
import {
  guestbookInputUserNameAtom,
  guestbookInputPasswordAtom,
  guestbookInputContentAtom,
} from '@/app/atoms/appAtoms';

const SubmitButton = () => {
  const [isShowSubmitButton, setIsShowSubmitButton] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<number | null>(null); // 타이머 관리

  const onSubmit = () => {
    alert('작성 완료');
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
