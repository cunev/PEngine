import { ctx } from "../../app";
import { InputManager } from "../core/InputManager";
import { Vector2 } from "../core/Math";
import { assets } from "../core/TextureManager";

export class Slot {
  holdItem: number = 0;
  position: Vector2 = { x: 0, y: 0 };
  tag: string = "";
  visible: boolean = true;
  draw() {
    if (!this.visible) return;
    ctx.drawImage(
      assets.get("inventorySlot.png")!,
      this.position.x,
      this.position.y
    );
    if (this.holdItem > 0) this.drawItem();
  }

  isInside() {
    return (
      this.visible &&
      InputManager.relativeMouseX > this.position.x &&
      InputManager.relativeMouseY > this.position.y &&
      InputManager.relativeMouseX < this.position.x + 123 &&
      InputManager.relativeMouseY < this.position.y + 123
    );
  }

  private drawItem() {
    const itemTexture = assets.get(`item${this.holdItem}.png`)!;
    if (itemTexture.width > 120 || itemTexture.height > 120) {
      if (itemTexture.height > itemTexture.width) {
        const ratio = itemTexture.width / itemTexture.height;
        ctx.drawImage(
          itemTexture,
          this.position.x + 61.5 - (ratio * 90) / 2,
          this.position.y + 61.5 - 45,
          ratio * 100,
          100
        );
      } else {
        const ratio = itemTexture.height / itemTexture.width;
        ctx.drawImage(
          itemTexture,
          this.position.x + 61.5 - 45,
          this.position.y + 61.5 - (ratio * 90) / 2,
          90,
          ratio * 90
        );
      }
    } else {
      ctx.drawImage(
        itemTexture,
        this.position.x + 61.5 - itemTexture.width / 2,
        this.position.y + 61.5 - itemTexture.height / 2
      );
    }
  }
}
