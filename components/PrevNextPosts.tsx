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
    <div className='flex flex-col md:flex-row justify-between gap-5 my-12'>
      {prevPost && (
        <Link
          href={`/blog/${prevPost.slug}`}
          className='flex items-center gap-5 w-full md:w-1/2 p-5 bg-neutral-100/50'
        >
          <div className='flex justify-center items-center bg-white border rounded-full size-9'>
            <ChevronLeftIcon className='size-5 min-w-9 mr-0.5' />
          </div>
          <div className='flex flex-col w-full'>
            <small className='text-sm'>이전 포스트</small>
            <p className='text-lg font-bold overflow-hidden whitespace-nowrap text-ellipsis w-full max-w-64 md:w-64 sm:max-w-fit'>
              {prevPost.title}
            </p>
          </div>
        </Link>
      )}

      {nextPost && (
        <Link
          href={`/blog/${nextPost.slug}`}
          className='flex items-center justify-end ml-auto gap-5 w-full md:w-1/2 p-5 bg-neutral-100/50'
        >
          <div className='flex flex-col w-full text-right'>
            <small className='text-sm'>다음 포스트</small>
            <p className='text-lg font-bold overflow-hidden ml-auto whitespace-nowrap text-ellipsis w-full max-w-64 md:w-64 sm:max-w-fit'>
              {nextPost.title}
            </p>
          </div>
          <div className='flex justify-center items-center bg-white border rounded-full size-9'>
            <ChevronRightIcon className='size-5 min-w-9 ml-0.5' />
          </div>
        </Link>
      )}
    </div>
  );
};

export default PrevNextPosts;
