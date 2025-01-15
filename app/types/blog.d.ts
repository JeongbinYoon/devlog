export interface Post {
  id: string;
  title: string;
  slug?: string;
  date: string;
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
  width?: number;
}

export interface KeyBoardData {
  key: KeyBoardKey;
  position: Vector3;
}

export interface KeycapProps {
  position: Vector3;
  label?: string;
  width: number;
}
