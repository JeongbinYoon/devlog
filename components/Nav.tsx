'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState, useLayoutEffect } from 'react';
const menuItems = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
];
const Nav = () => {
  const pathName = usePathname();
  const menuRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [highlightStyle, setHighlightStyle] = useState({
    width: '0px',
    height: '0px',
    transform: 'translateX(0px)',
    display: 'none',
  });

  const [isLoading, setIsLoading] = useState(true);

  //  하이라이트 위치 계산
  useLayoutEffect(() => {
    const currentIdx = menuItems.findIndex((item) => item.path === pathName);
    const currentMenu = menuRefs.current[currentIdx];

    if (currentMenu) {
      const { offsetWidth, offsetHeight, offsetLeft } = currentMenu;

      setHighlightStyle({
        width: `${offsetWidth}px`,
        height: `${offsetHeight}px`,
        transform: `translateX(${offsetLeft}px)`,
        display: 'block',
      });
      setIsLoading(false);
    }
  }, [pathName]);

  return (
    <nav className='hidden sm:flex relative h-fit'>
      {menuItems.map((menu, idx) => (
        <Link
          key={menu.path}
          href={menu.path}
          className={`px-4 py-2.5 transition-colors rounded-full duration-300 ${
            menu.path === pathName
              ? `text-white ${isLoading && 'bg-black'}` // 새로고침 시 하이라이트 위치 계산 전 임시 배경으로 깜빡임 해결
              : 'text-black'
          }`}
          ref={(el) => {
            menuRefs.current[idx] = el;
          }}
        >
          {menu.name}
        </Link>
      ))}

      {/* 메뉴 하이라이트 */}
      <div
        className={`absolute left-0 top-0 -z-10 bg-black rounded-full transition-all duration-300`}
        style={highlightStyle}
      ></div>
    </nav>
  );
};

export default Nav;
