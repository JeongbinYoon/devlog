import { SubmitButton } from '@/components/three';
import { useAtom, useSetAtom } from 'jotai';
import {
  guestbookInputUserNameAtom,
  guestbookInputPasswordAtom,
  guestbookInputContentAtom,
} from '@/app/atoms/appAtoms';
import { Html } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';

const GuestbookInputs = ({ direction }: { direction: string }) => {
  const setInputContent = useSetAtom(guestbookInputContentAtom);
  const setInputUserName = useSetAtom(guestbookInputUserNameAtom);
  const [inputPassword, setInputPassword] = useAtom(guestbookInputPasswordAtom);
  const [occludeKey, setOccludeKey] = useState(0); // occlude 초기화 키값
  const [isInputFocus, setIsInputFocus] = useState(false);
  const commonStyles: React.CSSProperties = {
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    resize: 'none',
  };

  useEffect(() => {
    if (!isInputFocus) {
      setOccludeKey((prev) => prev + 1); // input에서 focus out 하면 occlude 재적용
    }
  }, [isInputFocus]);

  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputContentRef = useRef<HTMLTextAreaElement>(null);

  return (
    // 가로 모니터 입력창
    direction === 'row' ? (
      <>
        <Html
          position={[-9999, 0, 0]}
          key={occludeKey}
          occlude='blending'
        ></Html>
        <Html
          position={[-0.93, -0.27, 0.04]}
          scale={0.25}
          transform
          occlude='blending'
        >
          <input
            ref={inputNameRef}
            placeholder='이름'
            onChange={(e) => setInputUserName(e.target.value)}
            onFocus={() => setIsInputFocus(true)}
            onBlur={() => setIsInputFocus(false)}
            style={{
              width: `135px`,
              height: '42px',
              padding: '10px',
              ...commonStyles,
            }}
          />
        </Html>
        <Html
          position={[-0.93, -0.57, 0.04]}
          scale={0.25}
          transform
          occlude='blending'
        >
          <input
            type='password'
            value={inputPassword}
            placeholder='비밀번호'
            onChange={(e) => setInputPassword(e.target.value)}
            onFocus={() => setIsInputFocus(true)}
            onBlur={() => setIsInputFocus(false)}
            style={{
              width: `135px`,
              height: '42px',
              padding: '10px',
              ...commonStyles,
            }}
          />
        </Html>
        <Html
          position={[0.45, -0.44, 0.04]}
          scale={0.25}
          transform
          occlude='blending'
        >
          <textarea
            ref={inputContentRef}
            placeholder='방명록을 남겨주세요'
            onChange={(e) => setInputContent(e.target.value)}
            onFocus={() => setIsInputFocus(true)}
            onBlur={() => setIsInputFocus(false)}
            style={{
              width: `295px`,
              height: '90px',
              padding: '10px',
              ...commonStyles,
            }}
          />
        </Html>
        <SubmitButton
          inputNameRef={inputNameRef}
          inputContentRef={inputContentRef}
        />
      </>
    ) : // 세로 모니터 입력창
    // <Html position={[-1, -0.01, 0]} scale={0.25} transform>
    //   <textarea
    //     value={inputContent}
    //     onChange={(e) => setInputContent(e.target.value)}
    //     style={{
    //       width: `240px`,
    //       height: '110px',
    //       padding: '8px',
    //       transform: `rotate(90deg)`,
    //       ...commonStyles,
    //     }}
    //   />
    // </Html>
    null
  );
};

export default GuestbookInputs;
