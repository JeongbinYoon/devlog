import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {
  Desk,
  Floor,
  Keyboard,
  Laptop,
  Monitor,
  Wall,
} from '@/components/three';

const Scene = () => {
  return (
    <Canvas style={{ background: 'white' }}>
      {/* 라이트 */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 10]} intensity={1} />

      {/* Room */}
      <Wall position={[0, 1.65, -4.85]} rotation={[0, 0, 0]} />
      <Wall position={[-4.85, 1.65, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Floor />

      <Desk />
      <group position={[-8, 5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <Keyboard />
      </group>
      <Monitor
        position={[-2.35, 2.5, -0.5]}
        rotation={[Math.PI / 30, Math.PI / 10, Math.PI / 2]}
      />
      <Monitor position={[0, 2.5, -1]} rotation={[Math.PI / 40, 0, 0]} />
      <Laptop />
      {/* Camera Controls */}
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
