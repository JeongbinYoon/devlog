'use client';
import { useAtomValue } from 'jotai';
import { floatingTextsAtom, likeClickCountAtom } from '@/app/atoms';
import { Heart } from '@/components';

const Likes = () => {
  const clickCount = useAtomValue(likeClickCountAtom);
  const floatingTexts = useAtomValue(floatingTextsAtom);
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
