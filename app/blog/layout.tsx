import { Footer } from '@/components';
import { getPostDetailBySlug } from '@/lib/posts';
import { HEADER_HEIGHT } from '../constants';

export default async function BlogLayout({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const params = await paramsPromise;
  const { slug } = params;
  const { id = '' } =
    (await getPostDetailBySlug(decodeURIComponent(slug))) || {};

  return (
    <div
      className="flex flex-col"
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT + 2}px)` }}
    >
      {children}
      <Footer />
    </div>
  );
}
