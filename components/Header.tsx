'use client';
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { SunIcon } from '@heroicons/react/24/outline';
import Nav from '@/components/Nav';

const Header = () => {
  return (
    <header>
      <div className='flex justify-between items-center max-w-3xl h-16 mx-auto'>
        <h1>LOGO</h1>

        <Nav />

        <div className='flex gap-1'>
          <button className='flex justify-center items-center border rounded-full size-9'>
            <MagnifyingGlassIcon className='size-4' />
          </button>
          <button className='flex justify-center items-center border rounded-full size-9'>
            {/* <MoonIcon className='size-5' /> */}
            <SunIcon className='size-5' />
          </button>
          <button className='flex sm:hidden justify-center items-center border rounded-full size-9'>
            <Bars3Icon className='size-5' />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
