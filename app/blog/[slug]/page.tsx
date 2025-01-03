import { getPostDetailBySlug, getSortedPostsData } from '@/lib/posts';
import { Comments, Likes, PrevNextPosts } from '@/components';

type Params = { params: Promise<{ slug: string }> };

export const generateStaticParams = async () => {
  const posts = getSortedPostsData();
  return posts.map((post) => ({ slug: post.slug }));
};

const PostDetailPage = async ({ params }: Params) => {
  const { slug } = await params;
  const {
    id = '',
    title = '',
    contentHtml = '',
    date = '',
    prevPost,
    nextPost,
  } = (await getPostDetailBySlug(decodeURIComponent(slug))) || {};

  if (!id) return <div>글을 불러올 수 없습니다.</div>;

  return (
    <article>
      <div className='mx-5 md:mx-auto mt-12 mb-24 max-w-3xl'>
        <div className='mb-7'>
          <h2 className='text-4xl font-bold mb-5'>{title}</h2>
          <span className='text-gray-500'>{date}</span>
          <section className='prose md:prose-md max-w-3xl mt-10'>
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </section>
        </div>
        <div className='lg:hidden block'>
          <Likes />
        </div>
        <PrevNextPosts posts={{ prevPost, nextPost }} />
        <Comments />
      </div>
    </article>
  );
};

export default PostDetailPage;
