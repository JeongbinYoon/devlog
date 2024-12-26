import Image from 'next/image';

const Likes = () => {
  return (
    <>
      <div
        className='fixed right-[100px] top-1/2 w-[60px] h-[57px]'
        style={{
          clipPath: 'url(#heartClip)',
          WebkitClipPath: 'url(#heartClip)',
        }}
      >
        {/* 하트 이미지 */}
        <div className='relative w-full h-full'>
          <Image
            src='/Rectangle.svg'
            alt='좋아요'
            width={60}
            height={57}
            className='overflow-hidden'
          />
          {/* 물결 애니메이션 */}
          <div className='absolute top-[0%] left-[-200%] w-[300px] h-[300px] rounded-[40%] bg-[#18b2ff] opacity-50 animate-wave'></div>
          <div className='absolute top-[90%] left-[-200%] w-[300px] h-[300px] rounded-[40%] bg-[#00ff00] opacity-30 animate-waveSlow'></div>
          <div className='absolute top-[90%] left-[-200%] w-[300px] h-[300px] rounded-[40%] bg-[#ff1717] opacity-10 animate-waveMedium'></div>
        </div>

        {/* SVG로 하트 모양 정의 */}
        <svg width='0' height='0'>
          <clipPath id='heartClip' clipPathUnits='objectBoundingBox'>
            <path
              d='
            M0.65,0.85 
            C0.3,01 0,0.3 0,0.5 
            C0,0 0.1,0 0.5,0 
            C0.4,0 0.8,0.1 0.5,0.1 
            C0.4,0 0.8,0 1,0 
            C0.85,0 1,0 1,0.3 
            C1,0.6 0.6,0.95 0.5,0.85 
            Z'
            />
          </clipPath>
        </svg>
      </div>
      <div className='fixed right-[100px] top-1/2 mt-12 w-[60px] h-[57px] overflow-hidden'>
        <div className='relative'>
          <Image
            src='/Rectangle.svg'
            alt='좋아요'
            width={60}
            height={57}
            className='overflow-hidden'
          />
          <div className='absolute top-[90%] left-[-200%] w-[300px] h-[300px] rounded-[40%] bg-[#18b2ff] opacity-50 animate-wave'></div>
          <div className='absolute top-[90%] left-[-200%] w-[300px] h-[300px] rounded-[40%] bg-[#00ff00] opacity-30 animate-waveSlow'></div>
          <div className='absolute top-[90%] left-[-200%] w-[300px] h-[300px] rounded-[40%] bg-[#ff1717] opacity-10 animate-waveMedium'></div>
        </div>
      </div>
    </>
  );
};

export default Likes;
