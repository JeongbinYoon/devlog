import { Post } from '@/app/types/blog';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';
import Link from 'next/link';

interface PrevNextPosts {
  posts: {
    prevPost?: Post;
    nextPost?: Post;
  };
}
const PrevNextPosts = ({ posts }: PrevNextPosts) => {
  const { prevPost, nextPost } = posts;

  return (
    <div className='flex justify-between gap-5 my-12'>
      {prevPost && (
        <Link
          href={`/blog/${prevPost.slug}`}
          className='flex items-center gap-5 w-1/2 p-5 bg-neutral-100/50'
        >
          <div className='flex justify-center items-center bg-white border rounded-full size-9'>
            <ChevronLeftIcon className='size-5 mr-0.5' />
          </div>
          <div className='flex flex-col'>
            <small className='text-sm'>이전 포스트</small>
            <p className='text-lg font-bold overflow-hidden whitespace-nowrap text-ellipsis w-64'>
              {prevPost.title}
            </p>
          </div>
        </Link>
      )}

      {nextPost && (
        <Link
          href={`/blog/${nextPost.slug}`}
          className='flex items-center justify-end ml-auto  gap-5 w-1/2 p-5 bg-neutral-100/50'
        >
          <div className='flex flex-col text-right'>
            <small className='text-sm'>다음 포스트</small>
            <p className='text-lg font-bold overflow-hidden whitespace-nowrap text-ellipsis w-64'>
              {nextPost.title}
            </p>
          </div>
          <div className='flex justify-center items-center bg-white border rounded-full size-9'>
            <ChevronRightIcon className='size-5 ml-0.5' />
          </div>
        </Link>
      )}
    </div>
  );
};

export default PrevNextPosts;
