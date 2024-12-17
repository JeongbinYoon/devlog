import { getPostDetail } from '@/lib/posts';

type Params = { params: Promise<{ slug: string }> };

const PostDetailPage = async ({ params }: Params) => {
  const { slug } = await params;
  const { content = '' } = getPostDetail(slug) || {};
  return <div>{content}</div>;
};

export default PostDetailPage;
