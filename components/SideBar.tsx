'use client';

import { useAtomValue } from 'jotai';
import { isSidebarOpenAtom } from '@/app/atoms';
import Nav from '@/components/Nav';
import { useState, useEffect } from 'react';

const SideBar = () => {
  const HEADER_HEIGHT = 64;
  const isSidebarOpen = useAtomValue(isSidebarOpenAtom);
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden'; // 스크롤 잠금
      setShouldRender(true);
      setTimeout(() => setIsAnimating(true), 0);
    } else {
      setIsAnimating(false);
      document.body.style.overflow = ''; // 스크롤 복원
      const timer = setTimeout(() => setShouldRender(false), 300); // 애니메이션 이후 DOM 제거
      return () => clearTimeout(timer);
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    const handleScroll = () => setScrollValue(window.scrollY);

    window.addEventListener('scroll', handleScroll);
    return window.addEventListener('scroll', handleScroll);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`block md:hidden absolute w-full px-5 py-8 bg-stone-100 transition-transform duration-300 ${
        isAnimating ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        top: `${HEADER_HEIGHT + scrollValue}px`,
      }}
    >
      <Nav />
    </div>
  );
};

export default SideBar;
