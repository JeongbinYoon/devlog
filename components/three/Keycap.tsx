import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { KeycapProps } from '@/app/types/blog';

const Keycap = ({ position, label, width }: KeycapProps) => {
  return (
    <group position={position}>
      {/* 키캡 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[width, 0.6, 0.8]} />
        <meshBasicMaterial color='white' toneMapped={false} />
      </mesh>
      <lineSegments rotation={[-Math.PI / 2, 0, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(width, 0.6, 0.8)]} />
        <lineBasicMaterial color='black' />
      </lineSegments>
      {/* 키 라벨 */}
      {label && (
        <Text
          position={[0, 0.3, 0.31]}
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

export default Keycap;
