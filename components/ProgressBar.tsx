'use client';
import { usePathname } from 'next/navigation';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  const pathName = usePathname();
  const hiddenProgressBarPage = ['/guestbook'];

  return (
    <div
      className={`h-[1px] transition-colors duration-300 bg-transparent
         ${progress > 0 ? 'bg-gray-200' : 'bg-transparent'} ${
        hiddenProgressBarPage.includes(pathName) && 'opacity-0'
      }`}
    >
      <div
        className={`bg-black w-full h-[1px] md:h-[2px] origin-left scale-x-0`}
        style={{ transform: `scaleX(${progress})` }}
      ></div>
    </div>
  );
};
export default ProgressBar;
