import { getSortedPostsData } from '@/lib/posts';

const BlogPage = () => {
  const allPostsData = getSortedPostsData();

  return (
    <>
      <ul className='flex flex-col gap-8'>
        {allPostsData.map(({ id, title, date }) => (
          <li key={id}>
            <p>{title}</p>
            <span>{date}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BlogPage;
