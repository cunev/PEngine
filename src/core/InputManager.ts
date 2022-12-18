import { EventEmitter } from "events";
import { win } from "../../app";
import { Camera } from "./Camera";
import { Vector2 } from "./Math";
import { client, Client } from "./Steam";

export class InputManager {
  static events = new EventEmitter();
  static inputAxis: Vector2 = { x: 0, y: 0 };
  static inputBlocked = false;
  private static moving = false;

  static relativeMouseX = 0;
  static relativeMouseY = 0;

  static createInput() {
    win.on("mousemove", (e) => {
      this.relativeMouseX = e.x;
      this.relativeMouseY = e.y;
    });
    win.on("keydown", (e) => {
      if (e.repeat) return;

      Client.send(client.localplayer.getName() + "pressed " + e.key);

      if (e.key == "F11") {
        win.fullscreen = !win.fullscreen;
      }

      if (e.key == "A") {
        this.inputAxis.x -= 1;
      }
      if (e.key == "D") {
        this.inputAxis.x += 1;
      }
      if (e.key == "W") {
        this.inputAxis.y -= 1;
      }
      if (e.key == "S") {
        this.inputAxis.y += 1;
      }

      if (!this.moving && (this.inputAxis.x || this.inputAxis.y)) {
        this.moving = true;
        if (!this.inputBlocked) this.events.emit("move", true);
      }
      if (!this.inputBlocked) this.events.emit("inputkey");
    });

    win.on("keyup", (e) => {
      if (e.repeat) return;

      if (e.key == "A") {
        this.inputAxis.x += 1;
      }
      if (e.key == "D") {
        this.inputAxis.x -= 1;
      }
      if (e.key == "W") {
        this.inputAxis.y += 1;
      }
      if (e.key == "S") {
        this.inputAxis.y -= 1;
      }

      if (this.moving && !(this.inputAxis.x || this.inputAxis.y)) {
        this.moving = false;
        if (!this.inputBlocked) this.events.emit("move", false);
      }
      if (!this.inputBlocked) this.events.emit("inputkey");
    });
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
