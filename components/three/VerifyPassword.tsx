import * as THREE from 'three';
import { Html, Text } from '@react-three/drei';
import { useRef } from 'react';
import { useSetAtom } from 'jotai';
import { isOpenedVerifyPasswordAtom } from '@/app/atoms';

const VerifyPassword = () => {
  const popupRef = useRef<THREE.Group>(null);
  const setIsOpenedVerifyPassword = useSetAtom(isOpenedVerifyPasswordAtom);

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

  const handleCloseVerifyPassword = () => {
    setIsOpenedVerifyPassword(false);
  };

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
        <button style={{ ...buttonStyle, background: '#ccc' }}>확인</button>
      </Html>
    </group>
  );
};

export default VerifyPassword;
