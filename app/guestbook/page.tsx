'use client';

import { HEADER_HEIGHT } from '@/app/constants';
import { Scene } from '@/components/three';

const GuestbookPage = () => {
  return (
    <div style={{ width: '100vw', height: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
      <Scene />
    </div>
  );
};
export default GuestbookPage;
