import { Footer } from '@/components';
import { HEADER_HEIGHT } from '../constants';

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
