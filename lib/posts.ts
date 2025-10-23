import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import { Post } from '@/app/types/blog';

const postsDirectory = path.join(process.cwd(), 'posts');

export const getSortedPostsData = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);
    const formattedDate = formatDate(matterResult.data.date);
    const slug = matterResult.data.title.toLowerCase().replace(/\s+/g, '-');

    return {
      id,
      slug,
      formattedDate,
      ...matterResult.data,
    };
  }) as Post[];

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const getPostDetailBySlug = async (slug: string) => {
  const posts = getSortedPostsData();
  const currentIdx = posts.findIndex((item) => item.slug === slug);
  const { id = '' } = posts[currentIdx] || {};

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

  const formattedDate = formatDate(datas.date);

  // 마크다운 to HTML
  const contentHtml = await parseMarkdownToHtml(matterResult.content);

  return {
    id,
    contentHtml,
    formattedDate,
    ...datas,
  };
};

const parseMarkdownToHtml = async (markdownContent: string) => {
  // 1. Markdown -> HTML 변환
  const processedContent = await remark()
    .use(remarkGfm) // GitHub Flavored Markdown 지원
    .use(remarkToc, { heading: '목차' }) // 목차 생성
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      theme: 'one-dark-pro',
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdownContent);

  return processedContent.toString();
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${year}년 ${month}월 ${day}일`;
};
