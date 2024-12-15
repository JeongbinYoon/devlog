'use client';

import { useAtomValue } from 'jotai';
import { isSidebarOpenAtom } from '@/app/atoms';
import Nav from '@/components/Nav';

const SideBar = () => {
  const isSidebarOpen = useAtomValue(isSidebarOpenAtom);

  return (
    <div
      className={`block md:hidden absolute w-full px-5 py-8 bg-stone-100 transition-transform translate-x-${
        isSidebarOpen ? '0' : 'full'
      }`}
      style={{ height: 'calc(100vh - 64px' }}
    >
      <Nav />
    </div>
  );
};

export default SideBar;
