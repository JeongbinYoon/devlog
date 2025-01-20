import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useMemo, useRef, useState } from 'react';
import { Vector3 } from '@/app/types/blog';
import { useFrame } from '@react-three/fiber';

interface SpeechBubbleProps {
  text: string;
  position: Vector3;
}

const SpeechBubble = ({ text, position }: SpeechBubbleProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const worldPositionY = useRef(0);
  const [isShow, setIsShow] = useState(false);

  useFrame(() => {
    if (groupRef.current) {
      const worldPosition = new THREE.Vector3();
      groupRef.current.getWorldPosition(worldPosition);
      worldPositionY.current = worldPosition.y;
      setIsShow(worldPosition.y < 13 && worldPosition.y > 1);
    }
  });

  // 텍스트 길이에 따라 말풍선 길이 계산 (문자당 0.2)
  const textWidth = useMemo(() => {
    const textLength = text.length;
    return Math.max(1, textLength * 0.2);
  }, [text]);

  // 말풍선(본체 + 꼬리)
  const shape = useMemo(() => {
    const bubbleShape = new THREE.Shape();

    // 말풍선 본체
    bubbleShape.moveTo(-textWidth / 2, 0.5); // 왼쪽 위
    bubbleShape.lineTo(textWidth / 2, 0.5); // 오른쪽 위
    bubbleShape.lineTo(textWidth / 2, -0.3); // 오른쪽 아래

    // 말꼬리
    bubbleShape.lineTo(textWidth / 2 + 0.2, -0.5); // 꼬리 끝

    // 말풍선 본체 이어짐
    bubbleShape.lineTo(-textWidth / 2, -0.5); // 왼쪽 아래
    bubbleShape.lineTo(-textWidth / 2, 0.5); // 닫기

    return bubbleShape;
  }, [textWidth]);

  return (
    <group ref={groupRef} position={position}>
      {isShow && (
        <>
          <lineSegments position={[-textWidth / 2, 0.8, 0]}>
            <edgesGeometry args={[new THREE.ShapeGeometry(shape)]} />
            <lineBasicMaterial color='black' />
          </lineSegments>

          <Text
            position={[-textWidth / 2, 0.8, 0.01]}
            fontSize={0.2}
            color='black'
            anchorX='center'
            anchorY='middle'
          >
            {text}
          </Text>
        </>
      )}
    </group>
  );
};

export default SpeechBubble;
