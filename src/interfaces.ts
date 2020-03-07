export interface Point {
  x: number;
  y: number;
}

export interface Graph {
  func: string;
  nodeId: number;
  ffValue?: number;
  currentFFValue?: number;
  bpValue?: number;
  children?: Graph[];
  accumulate: (c: number[]) => number;
}

export class BackpropGraph implements Graph {
  func = "";
  nodeId = 0;
  ffValue?: number;
  currentFFValue?: number;
  bpValue?: number;
  children?: Graph[];
  accumulate: (c: number[]) => number = (): number => NaN;
}

export enum Step {
  FF = "FF",
  BP = "BP",
  WOW = "WOW"
}

export enum Language {
  DE = "de",
  EN = "en"
}
