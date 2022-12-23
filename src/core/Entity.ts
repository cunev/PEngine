import EventEmitter from "events";
import { Texture } from "raylib";
import { Image } from "skia-canvas/lib";
import { ctx } from "../../app";
import { Animation } from "./Animation";
import { Vector2 } from "./Math";
import { assets } from "./TextureManager";

export abstract class Entity extends EventEmitter {
  position: Vector2 = { x: 0, y: 0 };
  scale: Vector2 = { x: 1, y: 1 };
  anchor: Vector2 = { x: 0, y: 0 };
  asset!: Texture;

  animations: Map<string, Animation> = new Map<string, Animation>();
  currentAnimation: Animation | undefined;
  abstract update(): void;
  abstract define(): void;

  afterDraw() {}
  beforeDraw() {}

  static all = new Set<Entity>();

  constructor() {
    super();
    Entity.all.add(this);
    this.define();
  }

  animate(animationName: string) {
    const targetAnimation = this.animations.get(animationName);
    if (!targetAnimation) throw "Unknown or unexisting animation";
    if (this.currentAnimation) {
      this.currentAnimation.unbindEntity();
    }
    targetAnimation.bindEntity(this);
    targetAnimation.animationStarted();
    this.currentAnimation = targetAnimation;
  }

  draw() {
    if (!this.currentAnimation) return;
    this.currentAnimation.update();
    this.asset = assets.get(this.currentAnimation.currentFrame.texture)!;

    ctx.rlPushMatrix();
    ctx.rlTranslatef(this.position.x, this.position.y, 0);
    ctx.rlScalef(Math.abs(this.scale.x), this.scale.y, 1);
    ctx.rlTranslatef(
      -this.asset.width * this.anchor.x,
      -this.asset.height * this.anchor.y,
      0
    );
    this.beforeDraw();
    ctx.DrawTextureRec(
      this.asset,
      {
        x: 0,
        y: 0,
        width: this.asset.width * (this.scale.x > 0 ? 1 : -1),
        height: this.asset.height * (this.scale.y > 0 ? 1 : -1),
      },
      { x: 0, y: 0 },
      ctx.WHITE
    );
    this.afterDraw();
    ctx.rlPopMatrix();
  }
}
