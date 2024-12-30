'use client';
import {
  floatingTextsAtom,
  isShakeAtom,
  likeClickCountAtom,
} from '@/app/atoms';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useId, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const HeartSVG = ({ uniqueId }: { uniqueId: string }) => {
  return (
    <svg
      width='62'
      height='59'
      viewBox='0 0 62 59'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs>
        {/* 선형 그라디언트 정의 */}
        <linearGradient
          id={`heartGradient-${uniqueId}`}
          x1='0%'
          y1='100%'
          x2='0%'
          y2='0%'
        >
          <stop
            offset='80%'
            style={{ stopColor: '#d2d2d2', stopOpacity: 0.8 }}
          />
          <stop
            offset='100%'
            style={{ stopColor: '#f0f0f0', stopOpacity: 1 }}
          />
        </linearGradient>
        {/* 원형 그라디언트 정의 */}
        <radialGradient
          id={`radialGradient-${uniqueId}`}
          cx='50%'
          cy='-80%'
          r='100%'
          fx='50%'
          fy='0%'
        >
          <stop
            offset='0%'
            style={{ stopColor: '#6b6b6b', stopOpacity: 0.3 }}
          />
          <stop
            offset='100%'
            style={{ stopColor: '#c2c2c2', stopOpacity: 1 }}
          />
        </radialGradient>

        {/* mask 적용 */}
        <mask id={`gradientMask-${uniqueId}`}>
          <rect
            width='100%'
            height='100%'
            fill={`url(#radialGradient-${uniqueId})`}
          />
        </mask>
        {/* 하트 모양을 clipPath로 정의 */}
        <clipPath id={`heartClip-${uniqueId}`}>
          <path d='M19.0088 1.52533C27.5952 4.02381 27.796 7.9848 30.653 7.9848C32.1974 7.9848 33.5255 5.94336 36.5987 4.00857C39.6719 2.07378 49.6329 -2.0548 56.5052 5.53203C63.3775 13.1189 61.1382 22.7624 57.8951 29.9074C54.652 37.0524 43.2239 48.5088 41.2626 50.3218C39.3013 52.1347 32.1356 58 30.5295 58C28.9234 58 23.6263 53.1859 19.7809 49.8038C15.9355 46.4217 9.21768 38.7892 6.54598 34.5235C3.87428 30.2578 3.07123 28.4601 2.00564 24.7733C0.940053 21.0866 0.41498 16.8361 2.00564 11.3974C3.59631 5.9586 10.4223 -0.973144 19.0088 1.52533Z' />
        </clipPath>
      </defs>
      {/* 하트 모양의 채우기 색상으로 그라디언트 추가 */}
      <path
        d='M19.0088 1.52533C27.5952 4.02381 27.796 7.9848 30.653 7.9848C32.1974 7.9848 33.5255 5.94336 36.5987 4.00857C39.6719 2.07378 49.6329 -2.0548 56.5052 5.53203C63.3775 13.1189 61.1382 22.7624 57.8951 29.9074C54.652 37.0524 43.2239 48.5088 41.2626 50.3218C39.3013 52.1347 32.1356 58 30.5295 58C28.9234 58 23.6263 53.1859 19.7809 49.8038C15.9355 46.4217 9.21768 38.7892 6.54598 34.5235C3.87428 30.2578 3.07123 28.4601 2.00564 24.7733C0.940053 21.0866 0.41498 16.8361 2.00564 11.3974C3.59631 5.9586 10.4223 -0.973144 19.0088 1.52533Z'
        fill={`url(#heartGradient-${uniqueId})`} // 선형 그라디언트 채우기
        mask={`url(#gradientMask-${uniqueId})`} // 원형 그라디언트 mask 적용
      />
    </svg>
  );
};

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

const Likes = () => {
  const clickCount = useAtomValue(likeClickCountAtom);
  const floatingTexts = useAtomValue(floatingTextsAtom);
  console.log('floatingTexts', floatingTexts);
  return (
    <div className='flex justify-center items-center w-full py-10 bg-stone-50 lg:bg-transparent lg:w-[60px] lg:ml-24'>
      <div className='flex flex-col items-center'>
        <p className='lg:hidden font-bold mb-4'>글이 마음에 드셨나요?</p>
        <div className='flex flex-col'>
          <Heart />
          <div className='relative text-[#e41010] mt-2'>
            {floatingTexts.map((id) => (
              <span
                key={id}
                className='absolute -right-2 font-bold animate-floatUp'
              >
                +1
              </span>
            ))}

            <p className='text-center text-2xl font-bold'>{clickCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Likes;
