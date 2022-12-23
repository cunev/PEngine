import { ctx } from "../../app";

export class AfterDraw {
  private static all: { func: () => void; z: number }[] = [];
  static createAfterDraw(z: number, drawFunction: () => void) {
    this.all.push({ func: drawFunction, z });
  }

  static drawAfterDraw() {
    const sorted = this.all.sort((a, b) => a.z - b.z);
    for (const func of sorted) {
      ctx.rlPushMatrix();

      func.func();
      ctx.rlPopMatrix();
    }

    this.all = [];
  }
}
