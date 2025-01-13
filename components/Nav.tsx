'use client';

import { isSidebarOpenAtom } from '@/app/atoms';
import { useSetAtom } from 'jotai';
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
  // { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'Guestbook', path: '/guestbook' },
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
  const [targetPath, setTargetPath] = useState('');
  const setIsSidebarOpen = useSetAtom(isSidebarOpenAtom);

  //  하이라이트 위치 계산
  const calculateHighlight = useCallback(
    (duration = 300) => {
      const currentIdx = menuItems.findIndex((item) =>
        item.path === '/'
          ? (targetPath || pathName) === item.path
          : (targetPath || pathName).startsWith(item.path)
      );
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
    [pathName, targetPath]
  );

  const closeSideBar = () => setTimeout(() => setIsSidebarOpen(false), 300);

  const onFocusTarget = (targetPath: string) => {
    setTargetPath(targetPath);
    calculateHighlight(300);
  };

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
      {menuItems.map((menu, idx) => {
        const isActive =
          (menu.path === '/' && (targetPath || pathName) === menu.path) ||
          (menu.path !== '/' && (targetPath || pathName).startsWith(menu.path));

        const className = `px-4 py-2.5 text-center transition-colors rounded-full ${
          isActive
            ? `text-white ${isLoading && 'bg-black'}` // 새로고침 시 하이라이트 위치 계산 전 임시 배경으로 깜빡임 해결
            : 'text-black'
        }`;
        return (
          <Link
            key={menu.path}
            href={menu.path}
            className={className}
            ref={(el) => {
              menuRefs.current[idx] = el;
            }}
            onClick={closeSideBar}
            onMouseOver={() => onFocusTarget(menu.path)}
            onMouseOut={() => setTargetPath('')}
          >
            {menu.name}
          </Link>
        );
      })}

      {/* 메뉴 하이라이트 */}
      <div
        className={`absolute left-0 top-0 -z-10 bg-black rounded-full transition-all`}
        style={highlightStyle}
      ></div>
    </nav>
  );
};

export default Nav;
