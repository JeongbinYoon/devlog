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
    <Canvas
      style={{ background: 'white' }}
      camera={{
        position: [0, 10, 10],
      }}
    >
      {/* 라이트 */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 10]} intensity={1} />

      {/* Room */}
      <Wall position={[0, 1.65, -4.85]} rotation={[0, 0, 0]} />
      <Wall position={[-4.85, 1.65, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Floor />

      <Desk />
      <Keyboard
        position={[-0.8, 0.56, 0]}
        rotation={[(-85 * Math.PI) / 180, 0, 0]}
      />
      <Monitor
        position={[-2.35, 2.1, -0.5]}
        rotation={[Math.PI / 30, Math.PI / 10, Math.PI / 2]}
      />
      <Monitor position={[0, 2, -1]} rotation={[Math.PI / 40, 0, 0]} />
      <Laptop position={[2.4, 1.6, -0.6]} rotation={[0, -Math.PI / 6, 0]} />

      {/* Camera Controls */}
      <OrbitControls makedefault target={[0, 1.5, 0]} />
      <axesHelper args={[5]} />
    </Canvas>
  );
};

export default Scene;
