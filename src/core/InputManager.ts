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

  private static keys: Set<number> = new Set<number>();

  static updateInput() {
    const keypressed = ctx.GetKeyPressed();
    if (keypressed) {
      this.keys.add(keypressed);
      this.events.emit("keydown", keypressed);
    }

    for (const key of this.keys) {
      if (!ctx.IsKeyDown(key)) {
        this.keys.delete(key);
        this.events.emit("keyup", key);
      }
    }

    if (ctx.IsMouseButtonPressed(0)) {
      this.events.emit("mousedown", 0);
    }

    if (ctx.IsMouseButtonReleased(0)) {
      this.events.emit("mouseup", 0);
    }

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
