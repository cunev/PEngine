import { EventEmitter } from "events";
import { ctx } from "../../app";
import { Camera } from "./Camera";
import { Vector2 } from "./Math";
// import { client, Client } from "./Steam";

export class InputManager {
  static events = new EventEmitter();
  static inputAxis: Vector2 = { x: 0, y: 0 };
  static inputBlocked = false;
  private static moving = false;

  static relativeMouseX = 0;
  static relativeMouseY = 0;

  static updateInput() {
    const mouseposition = ctx.GetMousePosition();
    this.relativeMouseX = mouseposition.x;
    this.relativeMouseY = mouseposition.y;

    this.inputAxis = { x: 0, y: 0 };

    if (ctx.IsKeyDown(ctx.KEY_A)) {
      this.inputAxis.x -= 1;
    }
    if (ctx.IsKeyDown(ctx.KEY_D)) {
      this.inputAxis.x += 1;
    }
    if (ctx.IsKeyDown(ctx.KEY_W)) {
      this.inputAxis.y -= 1;
    }
    if (ctx.IsKeyDown(ctx.KEY_S)) {
      this.inputAxis.y = 1;
    }

    if (!this.moving && (this.inputAxis.x || this.inputAxis.y)) {
      this.moving = true;
      if (!this.inputBlocked) this.events.emit("move", true);
    }

    if (this.moving && !(this.inputAxis.x || this.inputAxis.y)) {
      this.moving = false;
      if (!this.inputBlocked) this.events.emit("move", false);
    }
    if (this.inputAxis.x || this.inputAxis.y) {
      //   if (!this.inputBlocked) this.events.emit("inputkey");
    }
  }

  static blockInput(state: boolean) {
    if (state) {
      this.inputBlocked = true;
      this.events.emit("move", false);
    } else {
      this.inputBlocked = false;
      if (this.moving) {
        this.events.emit("move", true);
      }
    }
  }
}
