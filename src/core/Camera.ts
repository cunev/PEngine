import { ctx, dt, win } from "../../app";
import { Entity } from "./Entity";
import { lerp, lerpVector, Vector2 } from "./Math";

export class Camera {
  static position: Vector2 = { x: 0, y: 0 };
  static scale: number = 0.7;

  private static focusTarget: Entity;

  static update() {
    ctx.translate(win.width / 2, win.height / 2);
    ctx.scale(this.scale, this.scale);
    if (this.focusTarget) {
      this.position = lerpVector(
        this.position,
        this.focusTarget.position,
        0.05
      );
    }
    ctx.translate(-this.position.x, -this.position.y);
  }

  static untranslate() {
    ctx.scale(1 / Camera.scale, 1 / Camera.scale);
    ctx.translate(
      Camera.position.x * Camera.scale - win.width / 2,
      Camera.position.y * Camera.scale - win.height / 2
    );
  }

  static focus(entity: Entity) {
    this.focusTarget = entity;
  }

  static translate(position: Vector2) {
    this.position = position;
  }
}
