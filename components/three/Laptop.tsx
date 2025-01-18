import * as THREE from 'three';
import { Vector3 } from '@/app/types/blog';

interface LaptopProps {
  position?: Vector3;
  rotation?: Vector3;
}

const Laptop = ({ position, rotation }: LaptopProps) => {
  const monitor1Position: Vector3 = [0, 0, 0];
  const monitor2Position: Vector3 = [0, -0.7, 0.4];

  const MONITOR_DIMENSIONS = {
    width: 1.6,
    height: 0.9,
    depth: 0.05,
  };

  return (
    <group position={position} rotation={rotation}>
      <mesh name='Top Cover' position={monitor1Position}>
        <boxGeometry
          args={[
            MONITOR_DIMENSIONS.width,
            MONITOR_DIMENSIONS.height,
            MONITOR_DIMENSIONS.depth,
          ]}
        />
        <meshBasicMaterial color='white' toneMapped={false} />
      </mesh>
      <lineSegments position={monitor1Position}>
        <edgesGeometry
          args={[
            new THREE.BoxGeometry(
              MONITOR_DIMENSIONS.width,
              MONITOR_DIMENSIONS.height,
              MONITOR_DIMENSIONS.depth
            ),
          ]}
        />
        <lineBasicMaterial color='black' />
      </lineSegments>

      <mesh
        name='Bottom Cover'
        position={monitor2Position}
        rotation={[-Math.PI / 3, 0, 0]}
      >
        <boxGeometry
          args={[
            MONITOR_DIMENSIONS.width,
            MONITOR_DIMENSIONS.height,
            MONITOR_DIMENSIONS.depth,
          ]}
        />
        <meshBasicMaterial color='white' toneMapped={false} />
      </mesh>
      <lineSegments position={monitor2Position} rotation={[-Math.PI / 3, 0, 0]}>
        <edgesGeometry
          args={[
            new THREE.BoxGeometry(
              MONITOR_DIMENSIONS.width,
              MONITOR_DIMENSIONS.height,
              MONITOR_DIMENSIONS.depth
            ),
          ]}
        />
        <lineBasicMaterial color='black' />
      </lineSegments>
    </group>
  );
};

export default Laptop;
