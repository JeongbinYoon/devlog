import { HeaderTools, Nav, ProgressBar } from '@/components';
import Link from 'next/link';

const Header = () => {
  return (
    <header className={`sticky top-0 z-50 backdrop-blur-lg`}>
      <div className='flex justify-between items-center max-w-3xl h-16 mx-auto px-5 md:px-0'>
        <h1>
          <Link href={'/'}>LOGO</Link>
        </h1>

        <div className='hidden md:block'>
          <Nav />
        </div>
        <HeaderTools />
      </div>
      <ProgressBar />
    </header>
  );
};

export default Header;
