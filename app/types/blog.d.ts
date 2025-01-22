export interface Post {
  id: string;
  title: string;
  slug?: string;
  date: string;
  formattedDate: string;
  tags: string[];
  contentHtml: string;
}

export type Vector3 = [number, number, number];

interface WallProps {
  position: Vector3;
  rotation?: Vector3; // rotation을 선택적으로 추가
}

interface KeyBoardKey {
  name: string;
  code: string;
  width?: number;
}

export interface KeyBoardData {
  key: KeyBoardKey;
  position: Vector3;
  rowIndex: number;
}
