'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const pathName = usePathname();

  useEffect(() => setProgress(0), [pathName]);

  useEffect(() => {
    const updateProgressBar = () => {
      requestAnimationFrame(() => {
        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = window.scrollY / scrollableHeight;
        setProgress(Math.min(progress, 1));
      });
    };

    window.addEventListener('scroll', updateProgressBar);
    return () => window.removeEventListener('scroll', updateProgressBar);
  }, []);

  return (
    <div
      className={`h-[1px] transition-colors duration-300 ${
        progress > 0 ? 'bg-gray-200' : 'bg-transparent'
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
