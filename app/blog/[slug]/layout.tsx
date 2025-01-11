import { Likes } from '@/components';
import { getPostDetailBySlug } from '@/lib/posts';

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
    <div>
      {children}
      <aside className='fixed top-1/2 right-0 -translate-y-12 w-[calc((100vw-768px)/2)] lg:block hidden'>
        <Likes postId={id} />
      </aside>
    </div>
  );
}
