'use client';

import { useAtomValue } from 'jotai';
import { isSidebarOpenAtom } from '@/app/atoms';
import Nav from '@/components/Nav';
import { useState, useEffect } from 'react';

const SideBar = () => {
  const isSidebarOpen = useAtomValue(isSidebarOpenAtom);
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      setShouldRender(true);
      setTimeout(() => setIsAnimating(true), 0);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setShouldRender(false), 300); // 애니메이션 이후 DOM 제거
      return () => clearTimeout(timer);
    }
  }, [isSidebarOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className={`block md:hidden absolute w-full px-5 py-8 bg-stone-100 transition-transform duration-300 ${
        isAnimating ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{ height: 'calc(100vh - 64px)' }}
    >
      <Nav />
    </div>
  );
};

export default SideBar;
