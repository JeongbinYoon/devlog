'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { HeaderTools, Nav, ProgressBar } from '@/components';

const Header = () => {
  const HIDE_HEADER_SCROLL_THRESHOLD = 700;
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [progress, setProgress] = useState(0);
  const pathName = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 헤더 표시 여부
      if (
        currentScrollY > lastScrollY &&
        currentScrollY > HIDE_HEADER_SCROLL_THRESHOLD
      ) {
        setShowHeader(false);
      } else setShowHeader(true);

      setLastScrollY(currentScrollY);

      // ProgressBar 업데이트
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / scrollableHeight;
      setProgress(Math.min(progress, 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => setProgress(0), [pathName]);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-lg bg-white/70 transition ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className='flex justify-between items-center max-w-3xl h-16 mx-auto px-5 md:px-0'>
        <h1>
          <Link href={'/'} className='font-bold text-lg'>
            LOGO
          </Link>
        </h1>

        <div className='hidden md:block ml-auto'>
          <Nav />
        </div>
        <HeaderTools />
      </div>
      <ProgressBar progress={progress} />
    </header>
  );
};

export default Header;
