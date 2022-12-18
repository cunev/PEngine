import { Animation } from "../../../core/Animation";
import { PlayerEntity } from "../PlayerEntity";

export class IdleAnimation extends Animation {
  define(): void {
    this.loop = true;
    this.frames = [
      {
        texture: "playerIdle.png",
        duration: 500,
      },
    ];
  }
  animationTick(): void {}
  animationStarted(): void {
    this.reset();
    this.entity.anchor.y = 0.5;
    this.entity.scale.y = 1;

    (this.entity as PlayerEntity).hands = {
      front: { x: 0.2, y: 0.52 },
      back: { x: 0.59, y: 0.48 },
    };
  }
  animationStopped(): void {}
  animationLooped(): void {}
}
