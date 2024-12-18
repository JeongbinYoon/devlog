import { getPostDetail, getSortedPostsData } from '@/lib/posts';

type Params = { params: Promise<{ slug: string }> };

export const generateStaticParams = async () => {
  const posts = getSortedPostsData();
  return posts.map((post) => ({ slug: post.slug }));
};

const PostDetailPage = async ({ params }: Params) => {
  const { slug } = await params;
  const { id = '', title = '', content = '' } = getPostDetail(slug) || {};

  if (!id) return <div>글을 불러올 수 없습니다.</div>;

  return (
    <div>
      <h2 className='text-4xl mb-7'>{title}</h2>
      <div>{content}</div>
    </div>
  );
};

export default PostDetailPage;
