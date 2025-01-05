'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface WallProps {
  position: [number, number, number];
  rotation?: [number, number, number]; // rotation을 선택적으로 추가
}

function Wall({ position, rotation }: WallProps) {
  return (
    <lineSegments position={position} rotation={rotation}>
      <edgesGeometry args={[new THREE.BoxGeometry(10, 8, 0.3)]} />
      <lineBasicMaterial color='gray' />
    </lineSegments>
  );
}

function Floor() {
  return (
    <lineSegments rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
      <edgesGeometry args={[new THREE.BoxGeometry(10, 10, 0.3)]} />
      <lineBasicMaterial color='gray' />
    </lineSegments>
  );
}

function Desk() {
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
}
function Monitor1() {
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
}
function Monitor2() {
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
}
function Monitor3() {
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
}

function Scene() {
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
      {/* Monitor */}
      <Monitor1 />
      <Monitor2 />
      <Monitor3 />
      {/* Camera Controls */}
      <OrbitControls />
    </Canvas>
  );
}

const GuestbookPage = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Scene />
    </div>
  );
};
export default GuestbookPage;
