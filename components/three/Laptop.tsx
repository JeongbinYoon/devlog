import * as THREE from 'three';
import { Vector3 } from '@/app/types/blog';

const Laptop = () => {
  const monitor1Position: Vector3 = [2.4, 2.2, 0 - 1];
  const monitor2Position: Vector3 = [2.4, 1.5, -0.6];

  const MONITOR_DIMENSIONS = {
    width: 1.6,
    height: 0.9,
    depth: 0.05,
  };

  return (
    <>
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
    </>
  );
};

export default Laptop;
