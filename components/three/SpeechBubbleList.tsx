import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { SpeechBubble } from '@/components/three';
import { useSetAtom } from 'jotai';
import { orbitEnabledAtom } from '@/app/atoms/appAtoms';
import { ThreeEvent } from '@react-three/fiber';

const SpeechBubbleList = () => {
  const isDraggingRef = useRef(false);
  const setOrbitEnabled = useSetAtom(orbitEnabledAtom);
  const groupRef = useRef<THREE.Group>(null);
  const [lastMouseY, setLastMouseY] = useState(0);
  const messages = [
    '안녕하세요!',
    '안녕하세요! 안녕하세요!',
    '안녕하세요! 안녕하세요!안녕하세요!',
    '안녕하세요!',
    '안녕하세요!안녕하세요!안녕하세요!안녕하세요!',
    '안녕하세요!안녕하세요!',
    '안녕하세요!',
    '안녕하세요!안녕하세요!안녕하세요!안녕하세요!안녕하세요!',
  ];

  const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
    isDraggingRef.current = true;

    setLastMouseY(event.clientY);
    setOrbitEnabled(false); // OrbitControls 비활성화
  };

  const onPointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (isDraggingRef.current && groupRef.current) {
      const deltaY = event.clientY - lastMouseY; // 마우스 이동 거리 계산
      // 마우스 계산 값이 튀는 경우 방지
      if (Math.abs(deltaY) < 100) {
        groupRef.current.position.y -= deltaY * 0.005; // 이동 거리만큼 그룹 위치 업데이트
        setLastMouseY(event.clientY);
        setOrbitEnabled(false); // OrbitControls 비활성화
      }
    }
  };

  const onPointerUp = () => {
    isDraggingRef.current = false;
    setOrbitEnabled(true); // OrbitControls 활성화
  };

  // 드래그 중 group 밖으로 포인터가 나간 뒤 마우스를 떼는 경우 드래그 off
  useEffect(() => {
    const handlePointerUp = () => {
      if (isDraggingRef) {
        isDraggingRef.current = false;
        setOrbitEnabled(true); // OrbitControls 활성화
      }
    };

    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDraggingRef, setOrbitEnabled]);

  return (
    <group
      ref={groupRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {messages.map((message, index) => (
        <SpeechBubble
          key={index}
          text={message}
          position={[6.5, index * 1.5, -7.35]}
        />
      ))}
    </group>
  );
};

export default SpeechBubbleList;
