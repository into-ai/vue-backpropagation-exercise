import * as d3 from "d3";

import { Point, BackpropGraph } from "./interfaces";

export function bezierPoint(
  percent: number,
  p1: Point,
  cp1: Point,
  cp2: Point,
  p2: Point
): Point {
  function b1(t: number): number {
    return t * t * t;
  }
  function b2(t: number): number {
    return 3 * t * t * (1 - t);
  }
  function b3(t: number): number {
    return 3 * t * (1 - t) * (1 - t);
  }
  function b4(t: number): number {
    return (1 - t) * (1 - t) * (1 - t);
  }
  const pos: Point = { x: 0, y: 0 };
  pos.x =
    p1.x * b1(percent) +
    cp1.x * b2(percent) +
    cp2.x * b3(percent) +
    p2.x * b4(percent);
  pos.y =
    p1.y * b1(percent) +
    cp1.y * b2(percent) +
    cp2.y * b3(percent) +
    p2.y * b4(percent);
  return pos;
}

export function linePointAt(
  s: d3.HierarchyPointNode<BackpropGraph>,
  d: d3.HierarchyPointNode<BackpropGraph>,
  percent: number
): Point {
  const center = (s.y + d.y) / 2;
  const source = { x: s.y, y: s.x };
  const dest = { x: d.y, y: d.x };
  return bezierPoint(
    percent,
    source,
    { x: center, y: s.x },
    { x: center, y: d.x },
    dest
  );
}

export function diagonal(s: Point, d: Point): string {
  const path = `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                  ${(s.y + d.y) / 2} ${d.x},
                  ${d.y} ${d.x}`;
  return path;
}
