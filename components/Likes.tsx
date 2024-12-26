const Likes = () => {
  return (
    <div className='hidden md:block fixed right-[100px] top-1/2 w-[60px] h-fit'>
      {/* 하트 이미지 */}
      <div
        style={{
          clipPath: 'url(#heartClip)',
          WebkitClipPath: 'url(#heartClip)',
        }}
      >
        <div className='relative cursor-pointer'>
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
                id='heartGradient'
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
                id='radialGradient'
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
              <mask id='gradientMask'>
                <rect width='100%' height='100%' fill='url(#radialGradient)' />
              </mask>
              {/* 하트 모양을 clipPath로 정의 */}
              <clipPath id='heartClip'>
                <path d='M19.0088 1.52533C27.5952 4.02381 27.796 7.9848 30.653 7.9848C32.1974 7.9848 33.5255 5.94336 36.5987 4.00857C39.6719 2.07378 49.6329 -2.0548 56.5052 5.53203C63.3775 13.1189 61.1382 22.7624 57.8951 29.9074C54.652 37.0524 43.2239 48.5088 41.2626 50.3218C39.3013 52.1347 32.1356 58 30.5295 58C28.9234 58 23.6263 53.1859 19.7809 49.8038C15.9355 46.4217 9.21768 38.7892 6.54598 34.5235C3.87428 30.2578 3.07123 28.4601 2.00564 24.7733C0.940053 21.0866 0.41498 16.8361 2.00564 11.3974C3.59631 5.9586 10.4223 -0.973144 19.0088 1.52533Z' />
              </clipPath>
            </defs>
            {/* 하트 모양의 채우기 색상으로 그라디언트 추가 */}
            <path
              d='M19.0088 1.52533C27.5952 4.02381 27.796 7.9848 30.653 7.9848C32.1974 7.9848 33.5255 5.94336 36.5987 4.00857C39.6719 2.07378 49.6329 -2.0548 56.5052 5.53203C63.3775 13.1189 61.1382 22.7624 57.8951 29.9074C54.652 37.0524 43.2239 48.5088 41.2626 50.3218C39.3013 52.1347 32.1356 58 30.5295 58C28.9234 58 23.6263 53.1859 19.7809 49.8038C15.9355 46.4217 9.21768 38.7892 6.54598 34.5235C3.87428 30.2578 3.07123 28.4601 2.00564 24.7733C0.940053 21.0866 0.41498 16.8361 2.00564 11.3974C3.59631 5.9586 10.4223 -0.973144 19.0088 1.52533Z'
              fill='url(#heartGradient)' // 선형 그라디언트 채우기
              mask='url(#gradientMask)' // 원형 그라디언트 mask 적용
            />
          </svg>

          {/* 물결 애니메이션 */}
          <div className='absolute bottom-3 left-1/2 w-[80px] h-[80px] rounded-[40%] bg-[#e41010] opacity-50 animate-wave'></div>
          <div className='absolute bottom-3 left-1/2 w-[80px] h-[80px] rounded-[40%] bg-[#e41010] opacity-30 animate-waveSlow'></div>
          <div className='absolute bottom-3 left-1/2 w-[80px] h-[80px] rounded-[40%] bg-[#e41010] opacity-1 animate-waveMedium'></div>
        </div>
      </div>
      <div className='text-[#e41010] mt-2'>
        <p className='text-center text-2xl font-bold'>100</p>
      </div>
    </div>
  );
};

export default Likes;
