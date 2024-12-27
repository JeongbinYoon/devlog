import { Likes } from '@/components';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex justify-center'>
      {children}
      <aside className='sticky h-screen top-0 flex flex-col justify-center'>
        <Likes />
      </aside>
    </div>
  );
}
