export interface Post {
  id: string;
  title: string;
  slug?: string;
  date: string;
  tags: string[];
  contentHtml: string;
}

interface WallProps {
  position: [number, number, number];
  rotation?: [number, number, number]; // rotation을 선택적으로 추가
}

interface KeyBoardKey {
  name: string;
  width?: number;
}

export interface KeyBoardData {
  key: KeyBoardKey;
  position: [number, number, number];
}

export interface KeycapProps {
  position: [number, number, number];
  label?: string;
  width: number;
}
