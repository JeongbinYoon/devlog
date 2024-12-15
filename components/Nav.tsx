'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from 'react';

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
    transitionDuration: '0ms',
    display: 'none',
  });

  const [isLoading, setIsLoading] = useState(true);

  //  하이라이트 위치 계산
  const calculateHighlight = useCallback(
    (duration = 300) => {
      const currentIdx = menuItems.findIndex((item) => item.path === pathName);
      const currentMenu = menuRefs.current[currentIdx];

      if (currentMenu) {
        const { offsetWidth, offsetHeight, offsetLeft, offsetTop } =
          currentMenu;

        setHighlightStyle({
          width: `${offsetWidth}px`,
          height: `${offsetHeight}px`,
          transitionDuration: `${duration}ms`,
          transform: `translate(${offsetLeft}px, ${offsetTop}px)`,
          display: 'block',
        });
        setIsLoading(false);
      }
    },
    [pathName]
  );

  useLayoutEffect(() => {
    calculateHighlight();
  }, [pathName, calculateHighlight]);

  useEffect(() => {
    window.addEventListener('resize', () => calculateHighlight(0));
    return () =>
      window.removeEventListener('resize', () => calculateHighlight(0));
  }, [calculateHighlight]);

  return (
    <nav className={`flex flex-col md:flex-row relative h-fit`}>
      {menuItems.map((menu, idx) => (
        <Link
          key={menu.path}
          href={menu.path}
          className={`px-4 py-2.5 text-center transition-colors rounded-full ${
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
        className={`absolute left-0 top-0 -z-10 bg-black rounded-full transition-all`}
        style={highlightStyle}
      ></div>
    </nav>
  );
};

export default Nav;