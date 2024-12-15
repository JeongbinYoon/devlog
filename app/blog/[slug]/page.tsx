type Props = { params: { slug: string } };

const BlogDetailPage = ({ params }: Props) => {
  const { slug } = params;
  return <div>{slug} Detail</div>;
};

export default BlogDetailPage;
