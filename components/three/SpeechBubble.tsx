import * as THREE from 'three';
import { Text, Html } from '@react-three/drei';
import { useMemo, useRef, useState } from 'react';
import { GuestbookEntry, Vector3 } from '@/app/types/blog';
import { useFrame } from '@react-three/fiber';
import {
  ChatBubbleLeftRightIcon,
  ClockIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';

interface SpeechBubbleProps {
  entry: GuestbookEntry;
  position: Vector3;
}

const SpeechBubble = ({ entry, position }: SpeechBubbleProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const worldPositionY = useRef(0);
  const [isShow, setIsShow] = useState(false);

  const date = new Date(entry.createdAt);
  const formattedDate = date
    .toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(/\. /g, '.');

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
    const textLength = entry.content.length;
    return Math.max(3, textLength * 0.2);
  }, [entry.content]);

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

          {/* 작성자 */}
          <Text
            position={[-textWidth + 0.2, 1.05, 0.01]}
            fontSize={0.13}
            color='#333'
            anchorX='left'
          >
            {entry.name}
          </Text>

          {/* 댓글 내용 */}
          <Text
            position={[-textWidth + 0.2, 0.8, 0.01]}
            fontSize={0.2}
            color='black'
            anchorX='left'
          >
            {entry.content}
          </Text>

          {/* 댓글 생성일 */}
          <Html position={[-textWidth + 0.25, 0.5, 0]} scale={0.25} transform>
            <ClockIcon className='size-4' style={{ color: '#777' }} />
          </Html>
          <Text
            position={[-textWidth + 0.33, 0.5, 0.01]}
            fontSize={0.13}
            color='#777'
            anchorX='left'
          >
            {formattedDate}
          </Text>

          {/* 편집,답글 버튼 */}
          <Html position={[-0.4, 0.51, 0]} scale={0.25} transform>
            <div className='flex gap-1'>
              <button
                style={{
                  padding: '5px',
                  // background: '#f3f3f3',
                  color: '#777',
                  cursor: 'pointer',
                }}
              >
                <PencilIcon className='size-6' />
              </button>
              <button
                style={{
                  padding: '5px',
                  // background: '#ccc',
                  color: '#777',
                  cursor: 'pointer',
                }}
              >
                <ChatBubbleLeftRightIcon className='size-6' />
              </button>
            </div>
          </Html>
        </>
      )}
    </group>
  );
};

export default SpeechBubble;
