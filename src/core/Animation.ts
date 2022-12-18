import EventEmitter from "events";
import { Entity } from "./Entity";

interface AnimationFrame {
  texture: string;
  duration: number;
}

export abstract class Animation {
  frames: AnimationFrame[] = [];
  frameIndex: number = 0;
  frameProgress: number = 0;
  loop = false;
  currentFrame: AnimationFrame;
  entity!: Entity;

  private lastUpdate = Date.now();
  private timer = 0;

  constructor() {
    this.define();
    if (!this.frames.length) throw "Animations must have 1 or more frames";
    this.currentFrame = this.frames[this.frameIndex];
  }
  bindEntity(entity: Entity) {
    this.entity = entity;
  }
  unbindEntity() {
    this.entity = undefined as any;
  }
  reset() {
    this.frameIndex = 0;
  }

  update() {
    this.timer = Date.now() - this.lastUpdate;

    if (this.timer > this.currentFrame.duration) {
      this.frameIndex = (this.frameIndex + 1) % this.frames.length;
      this.lastUpdate = Date.now();
      this.frameProgress = 0;
    } else {
      this.frameProgress = this.timer / this.currentFrame.duration;
    }

    this.currentFrame = this.frames[this.frameIndex];
    this.animationTick();
  }

  abstract define(): void;
  abstract animationTick(): void;
  abstract animationStarted(): void;
  abstract animationStopped(): void;
  abstract animationLooped(): void;
}
