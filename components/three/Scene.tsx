import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {
  Desk,
  Floor,
  GradientPlane,
  Keyboard,
  Laptop,
  Monitor,
  SpeechBubbleList,
  Wall,
} from '@/components/three';
import { useAtomValue } from 'jotai';
import { orbitEnabledAtom } from '@/app/atoms/appAtoms';

const Scene = () => {
  const orbitEnabled = useAtomValue(orbitEnabledAtom);

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
      <Wall position={[0, 7.35, -7.35]} rotation={[0, 0, 0]} />
      <SpeechBubbleList />
      <GradientPlane />

      <Wall position={[-7.35, 7.35, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Floor />

      <Desk />
      <Keyboard
        position={[-0.8, 3.06, 0]}
        rotation={[(-85 * Math.PI) / 180, 0, 0]}
      />
      <Monitor
        position={[-2.35, 4.6, -0.5]}
        rotation={[Math.PI / 30, Math.PI / 10, Math.PI / 2]}
        direction='col'
      />
      <Monitor position={[0, 4.5, -1]} rotation={[Math.PI / 40, 0, 0]} />
      <Laptop position={[2.4, 4.1, -0.6]} rotation={[0, -Math.PI / 6, 0]} />

      {/* Camera Controls */}
      <OrbitControls makedefault target={[0, 4, 0]} enabled={orbitEnabled} />
      <axesHelper args={[5]} />
    </Canvas>
  );
};

export default Scene;
