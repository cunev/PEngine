import { Entity } from "../../core/Entity";
import { IdleAnimation } from "./animations/IdleAnimation";

export class DummyEntity extends Entity {
  define(): void {
    this.animations.set("idle", new IdleAnimation());
    this.animate("idle");
  }
  update(): void {}
}
