export type Word = {
  kelime: string;
  length: number;
  points: number;
  matchIndex?: number;
};

export type WordGroups = {
  [key: number]: Word[];
};