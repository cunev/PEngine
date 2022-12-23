import { ctx, dt, height, width } from "../../app";
import { Entity } from "./Entity";
import { lerp, lerpVector, Vector2 } from "./Math";

export class Camera {
  static position: Vector2 = { x: 0, y: 0 };
  static scale: number = 0.7;

  private static focusTarget: Entity;

  static update() {
    ctx.rlTranslatef(width / 2, height / 2, 0);
    ctx.rlScalef(this.scale, this.scale, 1);
    if (this.focusTarget) {
      this.position = lerpVector(
        this.position,
        this.focusTarget.position,
        0.05
      );
    }
    ctx.rlTranslatef(-this.position.x, -this.position.y, 0);
  }

  static untranslate() {
    ctx.rlScalef(1 / Camera.scale, 1 / Camera.scale, 1);
    ctx.rlTranslatef(
      Camera.position.x * Camera.scale - width / 2,
      Camera.position.y * Camera.scale - height / 2,
      0
    );
  }
  static retranslate() {
    ctx.rlTranslatef(width / 2, height / 2, 0);
    ctx.rlScalef(this.scale, this.scale, 1);

    ctx.rlTranslatef(-this.position.x, -this.position.y, 0);
  }

  static focus(entity: Entity) {
    this.focusTarget = entity;
  }

  static translate(position: Vector2) {
    this.position = position;
  }
}
