import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from '@/app/types/blog';

const EditingCircle = ({ position }: { position: Vector3 }) => {
  const circleRef = useRef<THREE.Mesh>(null);
  const opacityRef = useRef(0); // 현재 투명도 상태
  const targetOpacityRef = useRef(1); // 목표 투명도 상태

  useEffect(() => {
    const interval = setInterval(() => {
      targetOpacityRef.current = targetOpacityRef.current === 1 ? 0 : 1;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useFrame(() => {
    if (circleRef.current) {
      const material = circleRef.current.material as THREE.MeshBasicMaterial;
      if (material && 'opacity' in material) {
        // 목표 투명도로 부드럽게 보간 (lerp)
        opacityRef.current = THREE.MathUtils.lerp(
          opacityRef.current,
          targetOpacityRef.current,
          0.05
        );
        material.opacity = opacityRef.current;
      }
    }
  });

  return (
    <mesh ref={circleRef} position={position}>
      <circleGeometry args={[0.03, 32]} />
      <meshBasicMaterial color='orange' transparent />
    </mesh>
  );
};

export default EditingCircle;
