import { ctx, dt } from "../../../app";
import { Entity } from "../../core/Entity";
import { InputManager } from "../../core/InputManager";
import { Vector2 } from "../../core/Math";
import { client } from "../../core/Steam";
import { assets } from "../../core/TextureManager";
import { IdleAnimation } from "./animations/IdleAnimation";
import { RunAnimation } from "./animations/RunAnimation";

export class PlayerEntity extends Entity {
  anchor: Vector2 = { x: 0.5, y: 0.5 };
  entity: any;
  hands: { front: Vector2; back: Vector2 } = {
    front: { x: 0.2, y: 0.52 },
    back: { x: 0.59, y: 0.48 },
  };

  define(): void {
    this.animations.set("run", new RunAnimation());
    this.animations.set("idle", new IdleAnimation());
    this.animate("idle");

    InputManager.events.on("move", (moving) => {
      if (moving) {
        this.animate("run");
      } else {
        this.animate("idle");
      }
    });

    InputManager.events.on("inputkey", (moving) => {
      if (InputManager.inputAxis.x < 0) {
        this.scale.x = -1;
      } else if (InputManager.inputAxis.x > 0) {
        this.scale.x = 1;
      }
    });
  }

  update(): void {
    let speedMultiplier =
      Math.abs(InputManager.inputAxis.x) == Math.abs(InputManager.inputAxis.y)
        ? 1 / 1.414
        : 1;

    if (!InputManager.inputBlocked) {
      this.position.x += InputManager.inputAxis.x * 6 * dt * speedMultiplier;
      this.position.y += InputManager.inputAxis.y * 6 * dt * speedMultiplier;
    }
  }

  beforeDraw(): void {
    ctx.DrawTexture(
      assets.get("playerHandBack.png")!,
      this.asset.width * this.hands.back.x,
      this.asset.height * this.hands.back.y,
      ctx.WHITE
    );
  }
  afterDraw(): void {
    ctx.DrawTexture(
      assets.get("playerHandFront.png")!,
      this.asset.width * this.hands.front.x,
      this.asset.height * this.hands.front.y,
      ctx.WHITE
    );
  }
}
