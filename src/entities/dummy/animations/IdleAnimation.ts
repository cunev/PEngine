import { Animation } from "../../../core/Animation";

export class IdleAnimation extends Animation {
  define(): void {
    this.loop = true;
    this.frames = [
      {
        texture: "rock4.png",
        duration: 500,
      },
    ];
  }
  animationTick(): void {}
  animationStarted(): void {
    this.reset();
  }
  animationStopped(): void {}
  animationLooped(): void {}
}
