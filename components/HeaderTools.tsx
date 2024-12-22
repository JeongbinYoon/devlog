'use client';

import { ComponentType } from 'react';
import { useAtom } from 'jotai';
import { isSidebarOpenAtom } from '@/app/atoms';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  SunIcon,
  XMarkIcon,
} from '@/components/icons';

interface ButtonType {
  Icon: ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  className?: string;
  iconSize?: string;
  action?: () => void;
}

const IconButton = ({
  Icon,
  label,
  className = '',
  iconSize = 'size-5',
  action,
}: ButtonType) => (
  <button
    className={`flex justify-center items-center border rounded-full size-9 ${className}`}
    aria-label={label}
    onClick={action}
  >
    <Icon className={iconSize} />
  </button>
);

const HeaderTools = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useAtom(isSidebarOpenAtom);

  return (
    <div className='flex gap-1'>
      <IconButton
        Icon={MagnifyingGlassIcon}
        label={'검색'}
        iconSize={'size-4'}
      />
      <IconButton Icon={SunIcon} label={'테마 변경'} />
      <IconButton
        Icon={isSidebarOpen ? XMarkIcon : Bars3Icon}
        label={`메뉴 ${isSidebarOpen ? '닫기' : '열기'}`}
        className='md:hidden'
        action={() => setIsSidebarOpen((prev) => !prev)}
      />
    </div>
  );
};

export default HeaderTools;
