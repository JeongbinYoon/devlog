import HeaderTools from '@/components/HeaderTools';
import Nav from '@/components/Nav';

const Header = () => {
  return (
    <header>
      <div className='flex justify-between items-center max-w-3xl h-16 mx-auto px-5 md:px-0'>
        <h1>LOGO</h1>
        <div className='hidden md:block'>
          <Nav />
        </div>
        <HeaderTools />
      </div>
    </header>
  );
};

export default Header;
