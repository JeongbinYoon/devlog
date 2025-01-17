import * as THREE from 'three';
import { Vector3 } from '@/app/types/blog';

interface MonitorProps {
  position?: Vector3;
  rotation?: Vector3;
}

const Monitor = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: MonitorProps) => {
  const MONITOR_DIMENSIONS = {
    width: 3,
    height: 1.6875,
    depth: 0.05,
  };

  return (
    <group position={position} rotation={rotation}>
      {/* 화면 영역 */}
      <mesh name='Monitor Screen'>
        <boxGeometry
          args={[
            MONITOR_DIMENSIONS.width,
            MONITOR_DIMENSIONS.height,
            MONITOR_DIMENSIONS.depth,
          ]}
        />
        <meshBasicMaterial color='white' toneMapped={false} />
      </mesh>

      {/* 테두리 */}
      <lineSegments>
        <edgesGeometry
          attach='geometry'
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

export default Monitor;
