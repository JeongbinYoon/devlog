import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Post {
  id: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'posts');

export const getSortedPostsData = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');

    // 마크다운 파일 읽기
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // metadata 파싱
    const matterResult = matter(fileContents);

    return {
      id,
      content: matterResult.content,
      ...matterResult.data,
    };
  }) as Post[];

  // 날짜 순 정렬
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const getPostDetail = (id: string) =>
  getSortedPostsData().find((item) => item.id === id);
