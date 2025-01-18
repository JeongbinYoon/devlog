import * as THREE from 'three';
import { keyboardData } from '@/app/constants';
import { KeyBoardData, Vector3 } from '@/app/types/blog';
import { Keycap } from '@/components/three';

interface KeyboardProps {
  position?: Vector3;
  rotation?: Vector3;
}

const Keyboard = ({ position, rotation }: KeyboardProps) => {
  const DEFAULT_KEYCAP_WIDTH = 1;
  const keyPositions: KeyBoardData[] = [];

  // 배열을 순회하면서 각 키의 위치 계산
  keyboardData.forEach((row, rowIndex) => {
    let currentX = 0;
    row.forEach((key) => {
      const keyWidth = key.width || DEFAULT_KEYCAP_WIDTH;
      const keyInfo: KeyBoardData = {
        key,
        position: [currentX + keyWidth / 2, -rowIndex, 0.2],
        rowIndex,
      };
      keyPositions.push(keyInfo);
      currentX += keyWidth; // 다음 키의 X 위치를 갱신
    });
  });

  return (
    <group position={position} rotation={rotation} scale={[0.1, 0.1, 0.1]}>
      {/* 키캡 */}
      {keyPositions.map(({ key, position, rowIndex }) => (
        <Keycap
          key={key.code}
          position={position}
          keyData={key}
          rowIndex={rowIndex}
          width={key.width || DEFAULT_KEYCAP_WIDTH}
        />
      ))}

      {/* 키보드 판 */}
      <mesh position={[8, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[16.4, 0.7, 5.2]} />
        <meshBasicMaterial color='white' toneMapped={false} />
      </mesh>
      <lineSegments position={[8, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(16.4, 0.7, 5.2)]} />
        <lineBasicMaterial color='black' />
      </lineSegments>
    </group>
  );
};

export default Keyboard;
