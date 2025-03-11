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
import { useAtomValue, useSetAtom } from 'jotai';
import { isOpenedVerifyPasswordAtom, selectedEntryAtom } from '@/app/atoms';

interface SpeechBubbleProps {
  entry: GuestbookEntry;
  position: Vector3;
}

const SpeechBubble = ({ entry, position }: SpeechBubbleProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const worldPositionY = useRef(0);
  const [isShow, setIsShow] = useState(false);
  const setIsOpenedVerifyPassword = useSetAtom(isOpenedVerifyPasswordAtom);
  const setSelectedEntry = useSetAtom(selectedEntryAtom);
  const selectedEntry = useAtomValue(selectedEntryAtom);

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

  // 텍스트 길이에 따라 말풍선 길이 계산 (문자당 0.2)
  const textWidth = useMemo(() => {
    const textLength = Math.max(
      ...entry.content.split('\n').map((el) => el.length)
    );
    return Math.max(2.5, textLength * 0.2 + 0.2);
  }, [entry.content]);

  const lineLength = entry.content.trim().split('\n').length;
  const textHeight = useMemo(() => {
    return lineLength > 1 ? lineLength * 0.15 : 0;
  }, [lineLength]);

  const absolutePosition = new THREE.Vector3(
    0 + textWidth / 2,
    6 + textHeight,
    -1
  ); // 목표 위치
  useFrame(() => {
    if (groupRef.current) {
      // 벽 경계 밖으로 나는 경우 씬에서 제거
      const worldPosition = new THREE.Vector3();
      groupRef.current.getWorldPosition(worldPosition);
      worldPositionY.current = worldPosition.y;
      setIsShow(worldPosition.y < 13 && worldPosition.y > 1);

      const currentPosition = groupRef.current.position;
      if (selectedEntry?.id === entry.id) {
        // 부모 영향을 제거한 '절대 위치'를 목표 위치로 설정
        const targetPosition = absolutePosition.clone();

        // 현재 위치도 월드 기준으로 가져와야 부모 영향을 안 받음
        const currentWorldPosition = new THREE.Vector3();
        groupRef.current.getWorldPosition(currentWorldPosition);

        // '월드 기준'으로 보간 적용
        currentWorldPosition.lerp(targetPosition, 0.1);

        // 그룹의 '로컬 위치'를 조정해서 부모 영향을 제거
        groupRef.current.position.copy(
          currentWorldPosition.sub(worldPosition).add(groupRef.current.position)
        );
      } else {
        currentPosition.lerp(new THREE.Vector3(...position), 0.1);
      }
    }
  });

  // 말풍선(본체 + 꼬리)
  const shape = useMemo(() => {
    const bubbleShape = new THREE.Shape();

    // 말풍선 본체
    bubbleShape.moveTo(-textWidth / 2, 0.5); // 왼쪽 위
    bubbleShape.lineTo(textWidth / 2, 0.5); // 오른쪽 위
    bubbleShape.lineTo(textWidth / 2, -0.3 - textHeight); // 오른쪽 아래

    // 말꼬리
    bubbleShape.lineTo(textWidth / 2 + 0.2, -0.5 - textHeight); // 꼬리 끝

    // 말풍선 본체 이어짐
    bubbleShape.lineTo(-textWidth / 2, -0.5 - textHeight); // 왼쪽 아래
    bubbleShape.lineTo(-textWidth / 2, 0.5 - textHeight); // 닫기

    return bubbleShape;
  }, [textWidth, textHeight]);

  const handleOpenVerifyPassword = () => {
    setIsOpenedVerifyPassword(true);
    setSelectedEntry(entry);
  };

  return (
    <>
      <group ref={groupRef} position={position}>
        {isShow && (
          <>
            <lineSegments position={[-textWidth / 2, 0.8, 0]}>
              <edgesGeometry args={[new THREE.ShapeGeometry(shape)]} />
              <lineBasicMaterial color='black' />
            </lineSegments>
            {selectedEntry?.id === entry.id && (
              <mesh position={[-textWidth / 2, 0.8, -0.01]}>
                <shapeGeometry args={[shape]} />
                <meshBasicMaterial color='white' toneMapped={false} />
              </mesh>
            )}

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
              position={[-textWidth + 0.2, 0.9, 0.01]}
              fontSize={0.2}
              color='black'
              anchorX='left'
              anchorY='top'
              lineHeight={1}
            >
              {entry.content}
            </Text>

            {/* 댓글 생성일 */}
            <Html
              position={[-textWidth + 0.25, 0.5 - textHeight, 0]}
              scale={0.25}
              transform
              occlude='blending'
            >
              <ClockIcon className='size-4 -z-10' style={{ color: '#777' }} />
            </Html>
            <Text
              position={[-textWidth + 0.33, 0.5 - textHeight, 0.01]}
              fontSize={0.13}
              color='#777'
              anchorX='left'
              occlude='blending'
            >
              {formattedDate}
            </Text>

            {/* 편집,답글 버튼 */}
            <Html
              position={[-0.4, 0.51 - textHeight, 0]}
              scale={0.25}
              transform
              occlude='blending'
            >
              <div className='flex gap-1'>
                <button
                  onClick={handleOpenVerifyPassword}
                  style={{
                    padding: '5px',
                    color: '#777',
                    cursor: 'pointer',
                  }}
                >
                  <PencilIcon className='size-6' />
                </button>
                <button
                  onClick={() => setIsOpenedVerifyPassword(true)}
                  style={{
                    padding: '5px',
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
    </>
  );
};

export default SpeechBubble;
