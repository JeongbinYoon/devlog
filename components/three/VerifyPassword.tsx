import * as THREE from 'three';
import { Html, Text } from '@react-three/drei';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { isOpenedVerifyPasswordAtom, selectedEntryAtom } from '@/app/atoms';
import { verifyEntryPassword } from '@/app/guestbook/actions';

const VerifyPassword = () => {
  const popupRef = useRef<THREE.Group>(null);
  const setIsOpenedVerifyPassword = useSetAtom(isOpenedVerifyPasswordAtom);
  const [selectedEntry, setSelectedEntry] = useAtom(selectedEntryAtom);
  const [inputPassword, setInputPassword] = useState('');

  const buttonStyle = {
    padding: '10px 30px',
    fontSize: '14px',
    background: '#f3f3f3',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.05)',
    transition: 'opacity 500ms, transform 500ms',
  };
  const commonStyles: React.CSSProperties = {
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    resize: 'none',
  };

  const handleCloseVerifyPassword = useCallback(() => {
    setIsOpenedVerifyPassword(false);
    setSelectedEntry(null);
  }, [setIsOpenedVerifyPassword, setSelectedEntry]);

  const handleVerifyPassword = async () => {
    if (!inputPassword) {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    if (selectedEntry) {
      const result = await verifyEntryPassword({
        entryId: selectedEntry.id,
        inputPassword,
      });
      if (!result) alert('비밀번호가 틀렸습니다.');
    }
  };

  useEffect(() => {
    if (!selectedEntry) {
      handleCloseVerifyPassword();
    }
  }, [selectedEntry, handleCloseVerifyPassword]);

  return (
    <group ref={popupRef}>
      <Text
        position={[0, 0.45, 0.04]}
        fontSize={0.13}
        color='#333'
        anchorX='center'
      >
        비밀번호를 입력해주세요.
      </Text>

      {/* 입력 필드 */}
      <Html
        position={[0, 0.08, 0.04]}
        scale={0.25}
        transform
        occlude='blending'
      >
        <input
          type='password'
          onChange={(e) => setInputPassword(e.target.value)}
          style={{
            ...commonStyles,
            width: '230px',
            height: '45px',
            padding: '10px',
            textAlign: 'center',
          }}
        />
      </Html>

      {/* 버튼 */}
      <Html
        position={[-0.3, -0.4, 0.04]}
        scale={0.25}
        transform
        occlude='blending'
      >
        <button onClick={handleCloseVerifyPassword} style={buttonStyle}>
          취소
        </button>
      </Html>
      <Html
        position={[0.3, -0.4, 0.04]}
        scale={0.25}
        transform
        occlude='blending'
      >
        <button
          onClick={handleVerifyPassword}
          style={{ ...buttonStyle, background: '#ccc' }}
        >
          확인
        </button>
      </Html>
    </group>
  );
};

export default VerifyPassword;
