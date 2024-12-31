'use client';

import { HeaderTools, Nav } from '@/components';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);

    window.addEventListener('scroll', handleScroll);
    return window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-lg transition-colors duration-300 bg-white/70 dark:bg-transparent border-b ${
        isScrolled ? 'border-gray-0' : 'border-transparent'
      }`}
    >
      <div className='flex justify-between items-center max-w-3xl h-16 mx-auto px-5 md:px-0'>
        <h1>
          <Link href={'/'}>LOGO</Link>
        </h1>

        <div className='hidden md:block'>
          <Nav />
        </div>
        <HeaderTools />
      </div>
    </header>
  );
};

export default Header;
