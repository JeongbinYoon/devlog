import { Post } from '@/app/types/blog';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';
import { ComponentType } from 'react';
import { PrevNextButton } from '@/components';

interface PrevNextPostButtonsProps {
  posts: {
    prevPost?: Post;
    nextPost?: Post;
  };
}

interface ButtonInfo {
  post?: Post;
  icon: ComponentType<React.SVGProps<SVGSVGElement>>;
  direction: 'prev' | 'next';
}

const PrevNextPostButtons = ({ posts }: PrevNextPostButtonsProps) => {
  const { prevPost, nextPost } = posts;
  const buttons: ButtonInfo[] = [
    {
      post: prevPost,
      icon: ChevronLeftIcon,
      direction: 'prev',
    },
    {
      post: nextPost,
      icon: ChevronRightIcon,
      direction: 'next',
    },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between gap-5 my-12">
      {buttons.map(({ post, icon, direction }) => {
        return (
          post && (
            <PrevNextButton
              key={post.id}
              icon={icon}
              iconClassName="mr-0.5"
              post={post}
              direction={direction}
            />
          )
        );
      })}
    </div>
  );
};

export default PrevNextPostButtons;
