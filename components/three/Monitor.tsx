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
    <>
      {/* 화면 영역 */}
      <mesh name='Monitor Screen' position={position} rotation={rotation}>
        <boxGeometry
          args={[
            MONITOR_DIMENSIONS.width,
            MONITOR_DIMENSIONS.height,
            MONITOR_DIMENSIONS.depth,
          ]}
        />
        <meshStandardMaterial color='white' />
      </mesh>
    </>
  );
};

export default Monitor;
