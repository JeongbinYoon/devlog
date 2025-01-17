import { Post } from '@/app/types/blog';
import Link from 'next/link';
import { ComponentType } from 'react';

interface PrevNextButtonProps {
  icon: ComponentType<React.SVGProps<SVGSVGElement>>;
  iconClassName: string;
  post: Post;
  direction: 'prev' | 'next';
}

const PrevNextButton = ({
  icon: Icon,
  iconClassName,
  post,
  direction,
}: PrevNextButtonProps) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`flex items-center gap-5 w-full md:w-1/2 p-5 bg-neutral-100/50 ${
        direction === 'next' && 'justify-end ml-auto flex-row-reverse'
      }`}
    >
      <div className="flex justify-center items-center bg-white border rounded-full size-9">
        <Icon className={`size-5 min-w-9 ${iconClassName}`} />
      </div>

      <div
        className={`flex flex-col w-full ${
          direction === 'next' && 'text-right'
        }`}
      >
        <small className="text-sm">
          {`${direction === 'prev' ? '이전' : '다음'}`} 포스트
        </small>
        <p
          className={`text-lg font-bold overflow-hidden whitespace-nowrap text-ellipsis w-full max-w-64 md:w-64 sm:max-w-fit ${
            direction === 'next' && 'ml-auto'
          }`}
        >
          {post?.title}
        </p>
      </div>
    </Link>
  );
};

export default PrevNextButton;
