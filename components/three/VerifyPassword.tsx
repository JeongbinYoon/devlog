import * as THREE from 'three';
import { Html, Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { useSetAtom } from 'jotai';
import { isOpenedVerifyPasswordAtom } from '@/app/atoms';
import { orbitEnabledAtom } from '@/app/atoms/appAtoms';

const VerifyPassword = () => {
  const distance = 4.5; // 카메라와 팝업 간 거리
  const { camera } = useThree();
  const popupRef = useRef<THREE.Group>(null);
  const directionRef = useRef(new THREE.Vector3());
  const setIsOpenedVerifyPassword = useSetAtom(isOpenedVerifyPasswordAtom);
  const setOrbitEnabled = useSetAtom(orbitEnabledAtom);

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

  useFrame(() => {
    if (popupRef.current) {
      setOrbitEnabled(false); // 카메라 회전 제한
      camera.getWorldDirection(directionRef.current);
      directionRef.current.multiplyScalar(distance);
      popupRef.current.position.copy(camera.position).add(directionRef.current);
      popupRef.current.quaternion.copy(camera.quaternion);
    }
  });

  const handleCloseVerifyPassword = () => {
    setIsOpenedVerifyPassword(false);
    setOrbitEnabled(true);
  };

  return (
    <group ref={popupRef}>
      {/* 팝업 박스 */}
      <mesh>
        <boxGeometry args={[3, 1.8, 0.05]} />
        <meshBasicMaterial color='white' toneMapped={false} />
      </mesh>

      {/* 검은 테두리 */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(3, 1.8, 0.05)]} />
        <lineBasicMaterial color='black' />
      </lineSegments>

      <Text
        position={[0, 0.45, 0.04]}
        fontSize={0.13}
        color='#333'
        anchorX='center'
      >
        비밀번호를 입력해주세요.
      </Text>

      {/* 입력 필드 */}
      <Html position={[0, 0.08, 0.1]} scale={0.25} transform occlude='blending'>
        <input
          type='password'
          style={{
            width: '230px',
            height: '45px',
            padding: '10px',
            margin: '5px 50px',
            border: '1px solid #000',
            textAlign: 'center',
          }}
        />
      </Html>

      {/* 버튼 */}
      <Html position={[0, -0.4, 0.1]} scale={0.25} transform occlude='blending'>
        <div className='flex gap-2 my-7 mx-12'>
          <button onClick={handleCloseVerifyPassword} style={buttonStyle}>
            취소
          </button>
          <button style={{ ...buttonStyle, background: '#ddd' }}>확인</button>
        </div>
      </Html>
    </group>
  );
};

export default VerifyPassword;
