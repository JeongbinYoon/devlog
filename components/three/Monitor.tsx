import * as THREE from 'three';
import { Vector3 } from '@/app/types/blog';
import { MONITOR_DIMENSIONS } from '@/app/constants';
import { Screen } from '@/components/three';

interface MonitorProps {
  position?: Vector3;
  rotation?: Vector3;
  direction?: 'row' | 'col';
}

const Monitor = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  direction = 'row',
}: MonitorProps) => {
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

      {/* 입력창 */}
      <Screen direction={direction} />
    </group>
  );
};

export default Monitor;
