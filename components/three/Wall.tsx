import * as THREE from 'three';
import { WallProps } from '@/app/types/blog';

const Wall = ({ position, rotation }: WallProps) => {
  return (
    <lineSegments position={position} rotation={rotation}>
      <edgesGeometry args={[new THREE.BoxGeometry(10, 8, 0.3)]} />
      <lineBasicMaterial color='gray' />
    </lineSegments>
  );
};

export default Wall;
