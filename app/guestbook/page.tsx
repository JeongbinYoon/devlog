'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { keyboardData } from '@/app/constants';
import { KeyBoardData, KeycapProps, WallProps } from '@/app/types/blog';

const Wall = ({ position, rotation }: WallProps) => {
  return (
    <lineSegments position={position} rotation={rotation}>
      <edgesGeometry args={[new THREE.BoxGeometry(10, 8, 0.3)]} />
      <lineBasicMaterial color='gray' />
    </lineSegments>
  );
};

const Floor = () => {
  return (
    <lineSegments rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
      <edgesGeometry args={[new THREE.BoxGeometry(10, 10, 0.3)]} />
      <lineBasicMaterial color='gray' />
    </lineSegments>
  );
};

const Desk = () => {
  const deskTopPosition: [number, number, number] = [0, 0.4, 0]; // 책상 판 위치
  const leg1Height = 2.5; // 다리 높이
  const leg2Width = 2.5; // 다리 받침 길이
  const deskWidth = 7; // 책상 너비
  const deskDepth = 3; // 책상 깊이

  // 다리 위치를 계산 (책상의 네 모서리)
  let leg1Positions: [number, number, number][] = [
    [-deskWidth / 2 + 0.2, -leg1Height / 2, 0],
    [deskWidth / 2 - 0.2, -leg1Height / 2, 0],
  ];
  let leg2Positions: [number, number, number][] = [
    [-deskWidth / 2 + 0.2, -leg1Height, 0],
    [deskWidth / 2 - 0.2, -leg1Height, 0],
  ];

  // 책상 판 위치에 따라 다리 위치 계산
  [leg1Positions, leg2Positions] = [leg1Positions, leg2Positions].map(
    (positions) =>
      positions.map(([x, y, z]) => {
        return [
          x + deskTopPosition[0],
          y + deskTopPosition[1],
          z + deskTopPosition[2],
        ];
      })
  );

  return (
    <>
      {/* 책상 판 */}
      <mesh position={deskTopPosition}>
        <boxGeometry args={[deskWidth, 0.3, deskDepth]} />
        <meshStandardMaterial color='white' />
      </mesh>

      {/* 책상 다리 */}
      {leg1Positions.map((position, index) => (
        <mesh position={position} key={index}>
          <boxGeometry args={[0.2, leg1Height, 0.3]} />
          <meshStandardMaterial color='white' />
        </mesh>
      ))}
      {leg2Positions.map((position, index) => (
        <mesh position={position} key={index}>
          <boxGeometry args={[0.3, 0.2, leg2Width]} />
          <meshStandardMaterial color='white' />
        </mesh>
      ))}
    </>
  );
};
const Monitor1 = () => {
  const monitorPosition: [number, number, number] = [-2.35, 2.5, -0.5]; // 모니터 위치
  const monitorWidth = 3;
  const monitorHeigtht = 1.6875;

  return (
    <>
      {/*  모니터 */}
      <mesh
        position={monitorPosition}
        rotation={[Math.PI / 30, Math.PI / 10, Math.PI / 2]}
      >
        <boxGeometry args={[monitorWidth, monitorHeigtht, 0.1]} />
        <meshStandardMaterial color='white' />
      </mesh>
    </>
  );
};
const Monitor2 = () => {
  const monitorPosition: [number, number, number] = [0, 2.5, -1]; // 모니터 위치
  const monitorWidth = 3;
  const monitorHeigtht = 1.6875;

  return (
    <>
      {/*  모니터 */}
      <mesh position={monitorPosition} rotation={[Math.PI / 40, 0, 0]}>
        <boxGeometry args={[monitorWidth, monitorHeigtht, 0.1]} />
        <meshStandardMaterial color='white' />
      </mesh>
    </>
  );
};
const Monitor3 = () => {
  const monitor1Position: [number, number, number] = [2.4, 2.2, 0 - 1]; // 모니터 위치
  const monitor2Position: [number, number, number] = [2.4, 1.5, -0.6]; // 모니터 위치
  const monitorWidth = 1.6;
  const monitorHeigtht = 0.9;

  return (
    <>
      {/*  모니터 */}
      <mesh position={monitor1Position}>
        <boxGeometry args={[monitorWidth, monitorHeigtht, 0.1]} />
        <meshStandardMaterial color='white' />
      </mesh>
      <mesh position={monitor2Position} rotation={[-Math.PI / 3, 0, 0]}>
        <boxGeometry args={[monitorWidth, monitorHeigtht, 0.1]} />
        <meshStandardMaterial color='white' />
      </mesh>
    </>
  );
};

const Keycap = ({ position, label, width }: KeycapProps) => {
  return (
    <group position={position}>
      {/* 키캡 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[width, 0.6, 0.8]} />
        <meshStandardMaterial color='gray' wireframe />
      </mesh>
      {/* 키 라벨 */}
      {label && (
        <Text
          position={[0, 0.2, 0]}
          fontSize={0.2}
          color='black'
          anchorX='center'
          anchorY='middle'
        >
          {label}
        </Text>
      )}
    </group>
  );
};

const Keyboard = () => {
  // 키 위치 계산
  const keyPositions: KeyBoardData[] = [];

  // 배열을 순회하면서 각 키의 위치 계산
  keyboardData.forEach((row, rowIndex) => {
    let currentX = 0;
    // currentX - (row.length * keyWidth) / 2,
    row.forEach((key) => {
      const keyWidth = key.width || 1; // 키에 맞는 너비 가져오기
      const keyInfo: KeyBoardData = {
        key,
        position: [currentX + keyWidth / 2, -rowIndex, 0.3],
      };
      keyPositions.push(keyInfo); // 각 키의 위치 추가
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
          width={key.width || 1} // 키 크기 지정
        />
      ))}

      {/* 키보드 상판 */}
      <mesh position={[8, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[16.4, 0.7, 5.2]} />
        <meshStandardMaterial color='black' wireframe />
      </mesh>
    </group>
  );
};

const Scene = () => {
  return (
    <Canvas>
      {/* 라이트 */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 10]} intensity={0.8} castShadow />
      {/* Room */}
      <Wall position={[0, 1.65, -4.85]} rotation={[0, 0, 0]} />
      <Wall position={[-4.85, 1.65, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Floor />
      {/* Desk */}
      <Desk />
      {/* Keyboard */}
      <group position={[-8, 5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <Keyboard />
      </group>
      {/* Monitor */}
      <Monitor1 />
      <Monitor2 />
      <Monitor3 />
      {/* Camera Controls */}
      <OrbitControls />
    </Canvas>
  );
};

const GuestbookPage = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Scene />
    </div>
  );
};
export default GuestbookPage;
