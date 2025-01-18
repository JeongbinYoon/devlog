import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { KeyBoardKey, Vector3 } from '@/app/types/blog';

interface KeycapProps {
  position: Vector3;
  keyData: KeyBoardKey;
  rowIndex: number;
  width: number;
}

const Keycap = ({
  position: positionProps,
  keyData,
  rowIndex,
  width,
}: KeycapProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [position, setPosition] = useState<Vector3>([0, 0, 0]);

  useEffect(() => {
    const result = 0.2 - (rowIndex / 5) * 0.2; // 키보드 row 별 키캡 높이 조절
    const increments = [0, 0, result];
    const calcPosition = positionProps.map(
      (item, index) => item + increments[index]
    ) as Vector3;
    setPosition(calcPosition);
  }, [rowIndex, positionProps]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code.toLowerCase() === keyData.code.toLowerCase()) {
        setIsPressed(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code.toLowerCase() === keyData.code.toLowerCase()) {
        setIsPressed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keyData.code]);

  return (
    <group
      position={position}
      rotation={[((10 - rowIndex * 2) * Math.PI) / 180, 0, 0]} // 키보드 row 별 키캡 각도 조절
    >
      {/* 키캡 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[width, isPressed ? 0.4 : 0.6, 0.8]} />
        <meshBasicMaterial color='white' toneMapped={false} />
      </mesh>
      <lineSegments rotation={[-Math.PI / 2, 0, 0]}>
        <edgesGeometry
          args={[new THREE.BoxGeometry(width, isPressed ? 0.4 : 0.6, 0.8)]}
        />
        <lineBasicMaterial color='black' />
      </lineSegments>
      {/* 키 라벨 */}
      <Text
        position={[0, isPressed ? 0.1 : 0.3, 0.31]}
        fontSize={0.2}
        color='black'
        anchorX='center'
        anchorY='middle'
      >
        {keyData.name}
      </Text>
    </group>
  );
};

export default Keycap;
