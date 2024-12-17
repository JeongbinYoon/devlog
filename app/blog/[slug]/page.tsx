import { getPostDetail } from '@/lib/posts';

type Props = { params: { slug: string } };

const BlogDetailPage = ({ params }: Props) => {
  const { slug } = params;
  const { content = '' } = getPostDetail(slug) || {};
  return <div>{content}</div>;
};

export default BlogDetailPage;
