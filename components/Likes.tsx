'use client';

import { useAtomValue } from 'jotai';
import {
  floatingTextsAtom,
  isMaxLikeAttemptAtom,
  likesCountAtom,
} from '@/app/atoms';
import { Heart } from '@/components';

interface LikesProps {
  postId: string;
}

const Likes = ({ postId }: LikesProps) => {
  const floatingTexts = useAtomValue(floatingTextsAtom);
  const isMaxLikeAttempt = useAtomValue(isMaxLikeAttemptAtom);
  const likesCount = useAtomValue(likesCountAtom);
  return (
    <div className='flex justify-center items-center w-full py-10 lg:w-[130px] lg:ml-12'>
      <div className='flex flex-col items-center'>
        <p className='lg:hidden font-bold mb-4 z-10'>글이 마음에 드셨나요?</p>
        <div className='flex flex-col items-center'>
          <Heart postId={postId} />
          <div className='relative w-full mt-2'>
            {floatingTexts.map((id) => (
              <span
                key={id}
                className='absolute right-0 font-bold animate-floatUp text-[#e41010]'
              >
                +1
              </span>
            ))}

            <p className='text-center text-2xl font-bold text-[#e41010]'>
              {likesCount}
            </p>
            {isMaxLikeAttempt && (
              <p className='text-center text-sm text-gray-400 animate-fade-in'>
                더이상 누를 수 없어요!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Likes;
