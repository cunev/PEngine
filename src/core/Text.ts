import { ctx } from "../../app";

export function largeText(text: string, x: number, y: number) {
  ctx.DrawText(text, x, y - 15, 28, ctx.WHITE);

  // ctx.save();
  // ctx.fillStyle = "white";
  // ctx.strokeStyle = "black";
  // ctx.lineWidth = 8;
  // ctx.font = "900 28px Times";
  // ctx.strokeText(text, x, y);
  // ctx.fillText(text, x, y);
  // ctx.restore();
}

export function normalText(text: string, x: number, y: number) {
  ctx.DrawText(text, x, y - 12, 22, ctx.WHITE);

  // ctx.save();
  // ctx.fillStyle = "white";
  // ctx.strokeStyle = "black";
  // ctx.lineWidth = 6;
  // ctx.font = "700 22px Times";
  // ctx.strokeText(text, x, y);
  // ctx.fillText(text, x, y);
  // ctx.restore();
}

export function smallText(text: string, x: number, y: number) {
  ctx.DrawText(text, x, y - 12, 18, ctx.WHITE);

  // ctx.save();
  // ctx.fillStyle = "white";
  // ctx.strokeStyle = "black";
  // ctx.lineWidth = 4;
  // ctx.font = "700 18px Times";
  // ctx.strokeText(text, x, y);
  // ctx.fillText(text, x, y);
  // ctx.restore();
}

export function tinyText(text: string, x: number, y: number) {
  ctx.DrawText(text, x, y - 12, 16, ctx.WHITE);

  // ctx.save();
  // ctx.fillStyle = "white";
  // ctx.strokeStyle = "black";
  // ctx.lineWidth = 3;
  // ctx.font = "600 16px Times";
  // ctx.strokeText(text, x, y);
  // ctx.fillText(text, x, y);
  // ctx.restore();
}
