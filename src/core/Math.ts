import { dt } from "../../app";

export interface Vector2 {
  x: number;
  y: number;
}

export function lerpVector(
  origin: Vector2,
  target: Vector2,
  rate: number
): Vector2 {
  return {
    x: origin.x + (target.x - origin.x) * rate * dt,
    y: origin.y + (target.y - origin.y) * rate * dt,
  };
}

export function lerp(origin: number, target: number, rate: number): number {
  return origin + (target - origin) * rate * dt;
}

export function InCubic(origin: number, target: number, rate: number): number {
  return origin + (target - origin) * easeInCubic(rate);
}

export function OutCubic(origin: number, target: number, rate: number): number {
  return origin + (target - origin) * easeOutCubic(rate);
}

function easeInCubic(x: number): number {
  return x * x * x;
}
function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}
