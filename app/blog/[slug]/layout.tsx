import { Likes } from '@/components';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <aside className='fixed top-1/2 right-0 -translate-y-12 w-[calc((100vw-768px)/2)] lg:block hidden'>
        <Likes />
      </aside>
    </div>
  );
}
