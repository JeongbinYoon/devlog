'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAtom, useSetAtom } from 'jotai';
import {
  floatingTextsAtom,
  isMaxLikeAttemptAtom,
  isShakeAtom,
  likeClickCountAtom,
  likesCountAtom,
} from '@/app/atoms';
import { HeartSVG } from '@/components';
import { MAX_LIKES_CLICK_COUNT } from '@/app/constants';
import { countUp, getCount } from '@/app/blog/[slug]/actions';

interface HeartProps {
  postId: string;
}

const Heart = ({ postId }: HeartProps) => {
  const waves = [
    { opacity: 'opacity-50' },
    { opacity: 'opacity-30' },
    { opacity: 'opacity-1' },
  ];

  const uniqueId = useId();
  const MAX_BUBBLE_COUNT = 14;
  const [clickCount, setClickCount] = useAtom(likeClickCountAtom);
  const setLikesCount = useSetAtom(likesCountAtom);
  const setIsMaxLikeAttempt = useSetAtom(isMaxLikeAttemptAtom);
  const setFloatingTexts = useSetAtom(floatingTextsAtom);
  const [isShake, setIsShake] = useAtom(isShakeAtom);
  const [bubbles, setBubbles] = useState([{ x: 0, y: 0 }]);
  const [startMaxEffect, setStartMaxEffect] = useState(false);
  const [startSecondMaxEffect, setStartSecondMaxEffect] = useState(false);
  const [floatBubbles, setFloatBubbles] = useState(false);
  const shakeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const waveRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rotationRefs = useRef<number[]>(waves.map(() => 0)); // 각 웨이브의 회전 값 유지

  const handleClickHeart = () => {
    setClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount > MAX_LIKES_CLICK_COUNT) {
        setIsMaxLikeAttempt(true);
        return prev;
      }

      // 새로운 +1 텍스트 추가
      const id = uuidv4();
      setFloatingTexts((prev) => [...prev, id]);

      // 일정 시간 후 제거
      setTimeout(() => {
        setFloatingTexts((prev) => prev.filter((item) => item !== id));
      }, 500);

      countUp({ postId });
      return newCount;
    });

    onFocusHeart();
  };

  const getLikesCount = useCallback(async () => {
    if (postId) {
      const data = await getCount({ postId });
      console.log(data);
      setLikesCount(data?.count || 0);
    }
  }, [postId, setLikesCount]);

  const onMaxEffect = useCallback(() => {
    setStartMaxEffect(true); // 첫 번째 원 효과
    setTimeout(() => {
      // 클릭 수 Max 효과

      setStartMaxEffect(false);
      setStartSecondMaxEffect(true); // 두 번째 원 효과
    }, 500);
    setTimeout(() => setStartSecondMaxEffect(false), 3000);

    onStartBubbleEffect();
  }, []);

  useEffect(() => {
    getLikesCount();
  }, [clickCount, getLikesCount]);

  // Max 효과
  useEffect(() => {
    if (clickCount === MAX_LIKES_CLICK_COUNT) onMaxEffect();
  }, [clickCount, onMaxEffect]);

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

  const onStartBubbleEffect = () => {
    const angleStep = (Math.PI * 2) / MAX_BUBBLE_COUNT;

    setBubbles((prev) =>
      prev.map((_, idx) => {
        // 두 개씩 가깝게 위치하면서 약간의 랜덤값 추가
        const angle =
          idx % 2 === 0
            ? angleStep * idx - (angleStep / MAX_BUBBLE_COUNT) * 4
            : angleStep * idx;
        const x = Math.cos(angle + Math.random() * 0.2) * 50;
        const y = Math.sin(angle + Math.random() * 0.2) * 50;

        return { x, y };
      })
    );
    setTimeout(() => setFloatBubbles(true), 500);
  };

  useEffect(() => {
    setBubbles(
      Array.from({ length: MAX_BUBBLE_COUNT }).map(() => {
        return { x: 0, y: 0 };
      })
    );

    // clickCount 초기화 이후에 효과 실행
    if (clickCount === MAX_LIKES_CLICK_COUNT) {
      setTimeout(onStartBubbleEffect, 0);
    }
  }, [clickCount]);

  useEffect(() => {
    return setIsMaxLikeAttempt(false);
  }, [setIsMaxLikeAttempt]);

  return (
    <div
      onClick={handleClickHeart}
      onMouseEnter={onFocusHeart}
      onMouseLeave={onMouseLeave}
      className='relative'
    >
      {/* Max 시 모션 */}
      {clickCount > 9 && (
        <>
          {/* 원 효과 */}
          <div className={`${!startMaxEffect && 'opacity-0'}`}>
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full size-3.5 bg-purple-300 transition-transform duration-500 opacity-20 ${
                startMaxEffect && 'scale-[8]'
              }`}
            ></div>
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full size-2.5 bg-red-500 transition-transform duration-500 delay-150 opacity-20 ${
                startMaxEffect && 'scale-[9]'
              }`}
            ></div>
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full size-2.5 bg-white transition-transform duration-500 ${
                startSecondMaxEffect && 'scale-[10]'
              }`}
            ></div>
          </div>

          {/* 버블 효과 */}
          <div className={`${!floatBubbles && 'opacity-0'}`}>
            <div
              className={`absolute top-1/2 left-1/2 transition duration-500 delay-100 ${
                floatBubbles && '-translate-y-2 opacity-0'
              }`}
            >
              {bubbles.map((el, idx) => (
                <div
                  key={idx}
                  className={`absolute top-1/2 left-1/2 transition-transform delay-[500ms] size-1.5 rounded-full ${
                    idx % 2 === 0 ? 'bg-red-500' : 'bg-purple-500'
                  } opacity-40 ${floatBubbles && 'opacity-0'}`}
                  style={{
                    transform: `translate(-50%, -50%) translate(${el.x}px, ${el.y}px)`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </>
      )}

      <div
        className='relative cursor-pointer hover:scale-110 transition-transform'
        style={{
          clipPath: `url(#heartClip-${uniqueId})`,
          WebkitClipPath: `url(#heartClip-${uniqueId})`,
        }}
      >
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
            className={`absolute top-full left-1/2 -translate-x-1/2 ${
              clickCount === MAX_LIKES_CLICK_COUNT
                ? 'duration-150'
                : 'duration-500'
            } w-[30px] h-[30px] bg-[#e41010] ${item.opacity}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Heart;
