import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Post } from '@/app/types/blog';

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
    const slug = matterResult.data.title.toLowerCase().replace(/\s+/g, '-');

    return {
      id,
      slug,
      ...matterResult.data,
    };
  }) as Post[];

  // 날짜 순 정렬
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const getPostDetailBySlug = async (slug: string) => {
  const posts = getSortedPostsData();
  const currentIdx = posts.findIndex((item) => item.slug === slug);
  const { id = '' } = posts[currentIdx];

  if (currentIdx === -1) return null;
  const prevPost = posts[currentIdx + 1] || null;
  const nextPost = posts[currentIdx - 1] || null;
  const postInfoDetail = await getPostDetailById(id);

  return {
    ...postInfoDetail,
    prevPost,
    nextPost,
  };
};

export const getPostDetailById = async (id: string): Promise<Post> => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // metadata 파싱
  const matterResult = matter(fileContents);
  const datas = matterResult.data as {
    title: string;
    date: string;
    tags: string[];
  };

  // 마크다운 to HTML
  const contentHtml = await parseData(matterResult.content);

  return {
    id,
    contentHtml,
    ...datas,
  };
};

const parseData = async (htmlContent: string) => {
  const parsed = await remark().use(html).process(htmlContent);
  return parsed.toString();
};
