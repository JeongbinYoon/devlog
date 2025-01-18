import * as THREE from 'three';
import { Html, Text } from '@react-three/drei';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { MONITOR_DIMENSIONS } from '@/app/constants';
import { SubmitButton } from '@/components/three';

const Screen = ({ direction }: { direction: string }) => {
  const [text, setText] = useState('');
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
        context.font = '24px Arial';
        context.fillText(text, 30, 130);

        if (textureRef.current) {
          textureRef.current.needsUpdate = true;
        }
      }
    }
  }, [text]);

  useLayoutEffect(() => {
    initializeCanvas();
  }, [initializeCanvas]);

  useEffect(() => {
    updateTexture();
  }, [text, updateTexture]);

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
          key={text}
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

      {/* 가로 모니터 입력창*/}
      {direction === 'row' && (
        <>
          <Text position={[0, 0.6, 0.04]} fontSize={0.1} color='black'>
            안녕하세요! 반갑습니다 ^___^
          </Text>
          <Html position={[0, -0.4, 0]} scale={0.25} transform>
            <textarea
              value={text}
              placeholder='방명록을 남겨주세요'
              onChange={(e) => setText(e.target.value)}
              style={{
                width: `450px`,
                height: '110px',
                padding: '20px',
                border: 'none',
                borderRadius: '4px',
                fontSize: '20px',
                resize: 'none',
              }}
            />
          </Html>
          <SubmitButton text={text} />
        </>
      )}

      {/* 세로 모니터 입력창*/}
      {direction === 'col' && (
        <Html position={[-1, -0.01, 0]} scale={0.25} transform>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              width: `240px`,
              height: '110px',
              padding: '8px',
              border: 'none',
              borderRadius: '4px',
              fontSize: '20px',
              transform: `rotate(90deg)`,
              resize: 'none',
            }}
          />
        </Html>
      )}
    </>
  );
};

export default Screen;
