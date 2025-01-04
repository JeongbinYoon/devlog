'use client';

import Giscus from '@giscus/react';

const Comments = () => {
  return (
    <Giscus
      id='comments'
      repo='JeongbinYoon/devlog'
      repoId='R_kgDONcX1Hw'
      category='Comments'
      categoryId='DIC_kwDONcX1H84ClZYw'
      mapping='pathname'
      reactionsEnabled='1'
      emitMetadata='0'
      inputPosition='top'
      theme='light'
      lang='ko'
    />
  );
};
export default Comments;
