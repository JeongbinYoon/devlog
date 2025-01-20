import * as THREE from 'three';
import { useMemo } from 'react';

const GradientPlane = () => {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 216;
    const context = canvas.getContext('2d')!;
    const gradient = context.createLinearGradient(0, 0, 0, 256);

    // 위는 투명, 아래는 흰색
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');

    context.fillStyle = gradient;
    context.fillRect(0, 0, 256, 256);

    const canvas2 = document.createElement('canvas');
    canvas2.width = 512;
    canvas2.height = 256;
    const context2 = canvas2.getContext('2d')!;
    const gradient2 = context2.createLinearGradient(0, 256, 0, 0);

    // 위는 흰색, 아래는 투명
    gradient2.addColorStop(0, 'rgba(255, 255, 255, 0)');
    gradient2.addColorStop(0.6, 'rgba(255, 255, 255, 1)');
    gradient2.addColorStop(1, 'rgba(255, 255, 255, 1)');

    context2.fillStyle = gradient2;
    context2.fillRect(0, 0, 256, 256);

    return [new THREE.CanvasTexture(canvas), new THREE.CanvasTexture(canvas2)];
  }, []);

  return (
    <>
      <mesh position={[7.5, 13.35, -7.33]} renderOrder={1}>
        <planeGeometry args={[29, 3]} />
        <meshBasicMaterial
          map={texture[1]}
          transparent={true}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[7.5, 13.35, -7.36]} renderOrder={1}>
        <planeGeometry args={[29, 3]} />
        <meshBasicMaterial
          map={texture[1]}
          transparent={true}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[7.5, 1.95, -7.33]} renderOrder={1}>
        <planeGeometry args={[29, 3]} />
        <meshBasicMaterial
          map={texture[0]}
          transparent={true}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[7.5, 1.95, -7.36]} renderOrder={1}>
        <planeGeometry args={[29, 3]} />
        <meshBasicMaterial
          map={texture[0]}
          transparent={true}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};

export default GradientPlane;
