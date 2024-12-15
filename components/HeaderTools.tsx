import { ComponentType } from 'react';
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { SunIcon } from '@heroicons/react/24/outline';

interface ButtonType {
  Icon: ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  className?: string;
  iconSize?: number;
}

const IconButton = ({ Icon, label, className, iconSize = 5 }: ButtonType) => (
  <button
    className={`flex justify-center items-center border rounded-full size-9 ${className}`}
    aria-label={label}
  >
    <Icon className={`size-${iconSize}`} />
  </button>
);

const HeaderTools = () => {
  return (
    <div className='flex gap-1'>
      <IconButton Icon={MagnifyingGlassIcon} label={'검색'} iconSize={4} />
      <IconButton Icon={SunIcon} label={'테마 변경'} />
      <IconButton Icon={Bars3Icon} label={'메뉴 열기'} className='sm:hidden' />
    </div>
  );
};

export default HeaderTools;
