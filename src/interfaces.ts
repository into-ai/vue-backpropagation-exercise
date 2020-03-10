export interface Point {
  x: number;
  y: number;
}

export interface Example {
  errorHandler: (observed: number, expected: number) => number;
  netFuncTex: string;
  errFuncTex: string;
  netTree: BackpropGraph;
}

export interface Graph {
  func: string;
  nodeId: number;
  ffValue?: number;
  currentFFValue?: number;
  bpValue?: number;
  children?: Graph[];
  accumulate: (c: number[]) => number;
  derivative?: (c: Record<string, number>) => number;
}

export class BackpropGraph implements Graph {
  func = "";
  nodeId = 0;
  ffValue?: number;
  currentFFValue?: number;
  bpValue?: number;
  children?: Graph[];
  accumulate: (c: number[]) => number = (): number => NaN;
  derivative?: (c: Record<string, number>) => number;
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
