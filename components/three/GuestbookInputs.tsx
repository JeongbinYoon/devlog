import {
  EditingCircle,
  SubmitButton,
  VerifyPassword,
} from '@/components/three';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  guestbookInputUserNameAtom,
  guestbookInputPasswordAtom,
  guestbookInputContentAtom,
  isEditingEntryAtom,
  selectedEntryAtom,
} from '@/app/atoms/appAtoms';
import { Html } from '@react-three/drei';
import { useCallback, useEffect, useRef, useState } from 'react';
import { isOpenedVerifyPasswordAtom } from '@/app/atoms';

const GuestbookInputs = ({ direction }: { direction: string }) => {
  const [inputContent, setInputContent] = useAtom(guestbookInputContentAtom);
  const setInputUserName = useSetAtom(guestbookInputUserNameAtom);
  const [inputPassword, setInputPassword] = useAtom(guestbookInputPasswordAtom);
  const [occludeKey, setOccludeKey] = useState(0); // occlude 초기화 키값
  const [isInputFocus, setIsInputFocus] = useState(false);
  const lastKeyRef = useRef<string | null>(null);
  const isOpenedVerifyPassword = useAtomValue(isOpenedVerifyPasswordAtom);
  const [isEditingEntry, setIsEditingEntry] = useAtom(isEditingEntryAtom);
  const [selectedEntry, setSelectedEntry] = useAtom(selectedEntryAtom);

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

  const insertNewlineEvery28 = (text: string) => {
    // 한 줄당 28자 이상 넘어 갈 경우 줄바꿈 처리
    return text
      .split('\n')
      .map((line) => line.match(/.{1,28}/g)?.join('\n'))
      .join('\n');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    lastKeyRef.current = e.key;
  };

  const handleContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let text = e.target.value.trim();
    if (text.length > 100 && lastKeyRef.current !== 'Backspace') {
      alert('100자 이상 입력할 수 없습니다.');
      text = text.slice(0, 100);
      if (inputContentRef.current) {
        inputContentRef.current.value = text;
      }
    }

    const lines = inputContent.split('\n').length;
    if (
      text &&
      (lines > 4 || (lines === 4 && lastKeyRef.current === 'Enter')) &&
      lastKeyRef.current !== 'Backspace'
    ) {
      alert('5줄 이상 입력할 수 없습니다.');

      if (lastKeyRef.current === 'Enter') {
        text = text.trim();
      } else {
        text = insertNewlineEvery28(text)?.split('\n').splice(0, 4).join('\n');
      }
      if (inputContentRef.current) {
        inputContentRef.current.value = text;
      }
    }

    const parsedContent = insertNewlineEvery28(text);
    setInputContent(parsedContent);
  };

  const resetInputs = useCallback(() => {
    setInputContent('');
    setInputUserName('');
    setInputPassword('');
  }, [setInputContent, setInputPassword, setInputUserName]);

  useEffect(() => {
    if (isOpenedVerifyPassword) {
      resetInputs();
    }
  }, [isOpenedVerifyPassword, resetInputs]);

  useEffect(() => {
    if (isEditingEntry && selectedEntry) {
      setInputContent(selectedEntry.content);
      setInputUserName(selectedEntry.name);
      setTimeout(() => {
        if (inputContentRef.current && inputNameRef.current) {
          inputContentRef.current.value = selectedEntry.content;
          inputNameRef.current.value = selectedEntry.name;
        }
      }, 100);
    }
  }, [selectedEntry, isEditingEntry, setInputContent, setInputUserName]);

  useEffect(() => {
    if (!isEditingEntry) {
      resetInputs();
      setSelectedEntry(null);
      if (inputContentRef.current && inputNameRef.current) {
        inputContentRef.current.value = '';
        inputNameRef.current.value = '';
      }
    }
  }, [isEditingEntry, resetInputs, setSelectedEntry]);

  return (
    // 가로 모니터 입력창
    direction === 'row' ? (
      <>
        {isOpenedVerifyPassword ? (
          <VerifyPassword />
        ) : (
          <>
            <Html
              position={[-9999, 0, 0]}
              key={occludeKey}
              occlude='blending'
            ></Html>

            <Html
              position={[-1.05, -0.28, 0.04]}
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
                  width: `100px`,
                  height: '45px',
                  padding: '10px',
                  ...commonStyles,
                }}
              />
            </Html>
            {isEditingEntry && selectedEntry ? null : (
              <Html
                position={[-1.05, -0.6, 0.04]}
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
                    width: `100px`,
                    height: '45px',
                    padding: '10px',
                    ...commonStyles,
                  }}
                />
              </Html>
            )}
            <Html
              position={[0.35, -0.44, 0.04]}
              scale={0.25}
              transform
              occlude='blending'
            >
              <textarea
                ref={inputContentRef}
                placeholder='방명록을 남겨주세요'
                onKeyDown={handleKeyDown}
                onChange={handleContents}
                onFocus={() => setIsInputFocus(true)}
                onBlur={() => setIsInputFocus(false)}
                style={{
                  width: `330px`,
                  height: '90px',
                  padding: '10px',
                  ...commonStyles,
                }}
              />
            </Html>
            {isEditingEntry && selectedEntry && (
              <Html position={[-0.6, -1, 0]} scale={0.25} transform>
                <button
                  onClick={() => setIsEditingEntry(false)}
                  style={{
                    padding: '10px 20px',
                    fontSize: '14px',
                    background: '#f3f3f3',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  취소
                </button>
              </Html>
            )}
            <SubmitButton
              inputNameRef={inputNameRef}
              inputContentRef={inputContentRef}
            />
            {isEditingEntry && selectedEntry && (
              <EditingCircle position={[1.35, 0.7, 0.04]} />
            )}
          </>
        )}
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
