import * as THREE from 'three';
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { MONITOR_DIMENSIONS } from '@/app/constants';
import { GuestbookInputs } from '@/components/three';
import { useAtomValue } from 'jotai';
import { guestbookInputContentAtom } from '@/app/atoms/appAtoms';

const Screen = ({ direction }: { direction: string }) => {
  const inputContent = useAtomValue(guestbookInputContentAtom);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);

  const initializeCanvas = useCallback(() => {
    const canvas = document.createElement('canvas');

    if (direction === 'row') {
      canvas.width = 1024;
      canvas.height = 512;
    } else if (direction === 'col') {
      canvas.width = 512;
      canvas.height = 1024;
    }
    const context = canvas.getContext('2d');
    if (context) {
      context.fillStyle = '#ffffff'; // 흰색 배경
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = '#000000'; // 검은 텍스트
      context.font = '20px Arial';
    }
    canvasRef.current = canvas;
    textureRef.current = new THREE.CanvasTexture(canvas);
    textureRef.current.needsUpdate = true;
  }, [direction]);

  const updateTexture = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#ffffff'; // 흰색 배경
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#000000'; // 검은 텍스트
        context.font = '40px Arial';
        context.fillText(inputContent, 30, 60);

        if (textureRef.current) {
          textureRef.current.needsUpdate = true;
        }
      }
    }
  }, [inputContent]);

  useLayoutEffect(() => {
    initializeCanvas();
  }, [initializeCanvas]);

  useEffect(() => {
    updateTexture();
  }, [inputContent, updateTexture]);

  return (
    <>
      {/* 화면에 텍스처 적용 */}
      <mesh
        position={[0, 0, 0.03]}
        rotation={[0, 0, direction === 'row' ? 0 : -Math.PI / 2]}
      >
        <planeGeometry
          args={
            direction === 'row'
              ? [
                  MONITOR_DIMENSIONS.width - MONITOR_DIMENSIONS.frameWidth,
                  MONITOR_DIMENSIONS.height - MONITOR_DIMENSIONS.frameWidth,
                ]
              : [
                  MONITOR_DIMENSIONS.height - MONITOR_DIMENSIONS.frameWidth,
                  MONITOR_DIMENSIONS.width - MONITOR_DIMENSIONS.frameWidth,
                ]
          }
        />
        <meshBasicMaterial
          key={inputContent}
          map={textureRef.current || undefined}
          //   toneMapped={false}
        />
      </mesh>

      {/* 베젤 테두리 */}
      <lineSegments position={[0, 0, 0.03]}>
        <edgesGeometry
          attach='geometry'
          args={[
            new THREE.PlaneGeometry(
              MONITOR_DIMENSIONS.width - MONITOR_DIMENSIONS.frameWidth,
              MONITOR_DIMENSIONS.height - MONITOR_DIMENSIONS.frameWidth
            ),
          ]}
        />
        <lineBasicMaterial color='black' />
      </lineSegments>

      <GuestbookInputs direction={direction} />
    </>
  );
};

export default Screen;
