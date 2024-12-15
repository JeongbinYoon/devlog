import HeaderTools from '@/components/HeaderTools';
import Nav from '@/components/Nav';

const Header = () => {
  return (
    <header>
      <div className='flex justify-between items-center max-w-3xl h-16 mx-auto'>
        <h1>LOGO</h1>
        <Nav />
        <HeaderTools />
      </div>
    </header>
  );
};

export default Header;
