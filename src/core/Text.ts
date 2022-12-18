import { ctx } from "../../app";

export function largeText(text: string, x: number, y: number) {
  ctx.save();
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 8;
  ctx.font = "900 28px Times";
  ctx.strokeText(text, x, y);
  ctx.fillText(text, x, y);
  ctx.restore();
}
