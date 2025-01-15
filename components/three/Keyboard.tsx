import { keyboardData } from '@/app/constants';
import { KeyBoardData } from '@/app/types/blog';
import { Keycap } from '@/components/three';

const Keyboard = () => {
  const DEFAULT_KEYCAP_WIDTH = 1;
  const keyPositions: KeyBoardData[] = [];

  // 배열을 순회하면서 각 키의 위치 계산
  keyboardData.forEach((row, rowIndex) => {
    let currentX = 0;
    row.forEach((key) => {
      const keyWidth = key.width || DEFAULT_KEYCAP_WIDTH;
      const keyInfo: KeyBoardData = {
        key,
        position: [currentX + keyWidth / 2, -rowIndex, 0.3],
      };
      keyPositions.push(keyInfo);
      currentX += keyWidth; // 다음 키의 X 위치를 갱신
    });
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 키캡 */}
      {keyPositions.map(({ key, position }, index) => (
        <Keycap
          position={position}
          key={key.name + index}
          label={key.name}
          width={key.width || DEFAULT_KEYCAP_WIDTH}
        />
      ))}

      {/* 키보드 판 */}
      <mesh position={[8, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[16.4, 0.7, 5.2]} />
        <meshStandardMaterial color='black' wireframe />
      </mesh>
    </group>
  );
};

export default Keyboard;
