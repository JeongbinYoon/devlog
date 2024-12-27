import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';

const BlogPage = () => {
  const allPostsData = getSortedPostsData();

  return (
    <div className='max-w-3xl mx-auto mt-12 px-5 md:px-0'>
      <ul className='flex flex-col gap-8'>
        {allPostsData.map(({ id, title, slug, date }) => (
          <li key={id}>
            <Link href={`/blog/${slug}`}>
              <p className='text-xl font-bold mb-2'>{title}</p>
              <span className='text-gray-500'>{date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
