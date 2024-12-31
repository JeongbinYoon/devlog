'use client';

import { useEffect, useId, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAtom, useSetAtom } from 'jotai';
import {
  floatingTextsAtom,
  isShakeAtom,
  likeClickCountAtom,
} from '@/app/atoms';
import { HeartSVG } from '@/components';

const Heart = () => {
  const waves = [
    { opacity: 'opacity-50' },
    { opacity: 'opacity-30' },
    { opacity: 'opacity-1' },
  ];

  const uniqueId = useId();
  const MAX_CLICK_COUNT = 10;
  const [clickCount, setClickCount] = useAtom(likeClickCountAtom);
  const setFloatingTexts = useSetAtom(floatingTextsAtom);
  const [isShake, setIsShake] = useAtom(isShakeAtom);
  const shakeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const waveRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rotationRefs = useRef<number[]>(waves.map(() => 0)); // 각 웨이브의 회전 값 유지

  const handleClickHeart = () => {
    onFocusHeart();
    if (clickCount >= MAX_CLICK_COUNT) return;
    setClickCount((prev) => prev + 1);

    // 새로운 +1 텍스트 추가
    const id = uuidv4();
    setFloatingTexts((prev) => [...prev, id]);

    // 일정 시간 후 제거
    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((item) => item !== id));
    }, 500);
  };

  // 물결 및 차오름 애니메이션 구현
  useEffect(() => {
    const animationIds: number[] = [];

    waveRefs.current.forEach((wave, idx) => {
      const rotate = () => {
        if (wave) {
          const rotateAmount = rotationRefs.current[idx] + (isShake ? 2 : 0);
          const scaleAmount = !isShake ? 3 : 3.2;
          rotationRefs.current[idx] += (idx + 1) * 0.3;
          wave.style.transform = `translate(-50%, 30%) rotate(${rotateAmount}deg) scale(${
            (clickCount + scaleAmount) / 2.3
          })`;

          wave.style.borderRadius = isShake ? '30%' : '40%';
        }
        animationIds[idx] = requestAnimationFrame(rotate);
      };

      if (animationIds[idx]) cancelAnimationFrame(animationIds[idx]);

      animationIds[idx] = requestAnimationFrame(rotate);
    });

    return () => {
      animationIds.forEach((id) => cancelAnimationFrame(id));
    };
  }, [clickCount, isShake]);

  // 흔들기
  const onFocusHeart = () => {
    setIsShake(true);

    // 이전 타이머가 있다면 취소
    // 여러 번 마우스 over-out 케이스
    if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current);

    // 새로운 타이머 시작
    shakeTimeoutRef.current = setTimeout(() => {
      setIsShake(false);
      shakeTimeoutRef.current = null;
    }, 1000);
  };

  const onMouseLeave = () => {
    setIsShake(false);
    // 마우스 아웃 시 타이머 즉시 취소
    if (shakeTimeoutRef.current) {
      clearTimeout(shakeTimeoutRef.current);
      shakeTimeoutRef.current = null;
    }
  };

  return (
    <div
      onClick={handleClickHeart}
      onMouseEnter={onFocusHeart}
      onMouseLeave={onMouseLeave}
      style={{
        clipPath: `url(#heartClip-${uniqueId})`,
        WebkitClipPath: `url(#heartClip-${uniqueId})`,
      }}
      className='hover:scale-110 transition-transform'
    >
      <div className='relative cursor-pointer'>
        <HeartSVG uniqueId={uniqueId} />

        {/* 광택 (물결 상위 위치) */}
        <div className='absolute -top-2 z-10 w-full h-6 bg-gradient-to-b from-gray-100 to-transparent'></div>

        {/* 물결 애니메이션 */}
        {waves.map((item, i) => (
          <div
            key={item.opacity}
            ref={(el) => {
              waveRefs.current[i] = el;
            }}
            className={`absolute top-full left-1/2 -translate-x-1/2 duration-500 w-[30px] h-[30px] bg-[#e41010] ${item.opacity}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Heart;
