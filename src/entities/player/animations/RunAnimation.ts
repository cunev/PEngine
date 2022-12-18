import { Animation } from "../../../core/Animation";
import { InCubic, OutCubic } from "../../../core/Math";
import { PlayerEntity } from "../PlayerEntity";

export class RunAnimation extends Animation {
  define(): void {
    this.loop = true;
    this.frames = [
      {
        texture: "playerRun1.png",
        duration: 200,
      },
      {
        texture: "playerRun2.png",
        duration: 80,
      },
      {
        texture: "playerRun3.png",
        duration: 200,
      },
      {
        texture: "playerRun4.png",
        duration: 80,
      },
    ];
  }
  animationTick(): void {
    switch (this.frameIndex) {
      case 1:
        this.entity.anchor.y = OutCubic(0.5, 0.64, this.frameProgress);
        this.entity.scale.y = OutCubic(1, 0.95, this.frameProgress);
        (this.entity as PlayerEntity).hands = {
          front: { x: OutCubic(0.42, 0.14, this.frameProgress), y: 0.45 },
          back: { x: OutCubic(0.32, 0.65, this.frameProgress), y: 0.48 },
        };
        break;
      case 3:
        this.entity.anchor.y = OutCubic(0.5, 0.64, this.frameProgress);
        this.entity.scale.y = OutCubic(1, 0.95, this.frameProgress);
        (this.entity as PlayerEntity).hands = {
          front: { x: OutCubic(0.14, 0.42, this.frameProgress), y: 0.52 },
          back: { x: OutCubic(0.65, 0.32, this.frameProgress), y: 0.48 },
        };
        break;
      default:
        this.entity.anchor.y = InCubic(0.64, 0.5, this.frameProgress);
        this.entity.scale.y = OutCubic(0.95, 1, this.frameProgress);
        break;
    }
  }
  animationStarted(): void {
    this.reset();
  }
  animationStopped(): void {}
  animationLooped(): void {}
}
