import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';

const BlogPage = () => {
  const allPostsData = getSortedPostsData();

  return (
    <>
      <ul className='flex flex-col gap-8'>
        {allPostsData.map(({ id, title, date }) => (
          <li key={id}>
            <Link href={`/blog/${id}`}>
              <p>{title}</p>
              <span>{date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BlogPage;
