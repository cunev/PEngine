import { ctx } from "../../app";
import { InputManager } from "../core/InputManager";
import { Vector2 } from "../core/Math";
import { smallText } from "../core/Text";
import { assets } from "../core/TextureManager";
import { Item } from "../items/Item";

export class Slot {
  holdItem: Item | null = null;
  position: Vector2 = { x: 0, y: 0 };
  tag: string = "";
  visible: boolean = true;
  quantity: number = 1;
  draw() {
    if (!this.visible) return;
    ctx.rlPushMatrix();

    ctx.DrawTexture(
      assets.get("inventorySlot.png")!,
      this.position.x,
      this.position.y,
      ctx.WHITE
    );
    if (this.quantity > 1)
      smallText(
        this.quantity.toString(),
        this.position.x + 14,
        this.position.y + 110
      );
    if (this.holdItem) this.drawItem();
    ctx.rlPopMatrix();
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
    const itemTexture = this.holdItem!.getTexture();
    if (itemTexture.width > 120 || itemTexture.height > 120) {
      if (itemTexture.height > itemTexture.width) {
        const ratio = itemTexture.width / itemTexture.height;
        ctx.DrawTexturePro(
          itemTexture,
          {
            x: 0,
            y: 0,
            width: itemTexture.width,
            height: itemTexture.height,
          },
          {
            x: this.position.x + 61.5 - (ratio * 90) / 2,
            y: this.position.y + 61.5 - 45,
            width: 90 * ratio,
            height: 90,
          },
          {
            x: 0,
            y: 0,
          },
          0,
          ctx.WHITE
        );
      } else {
        const ratio = itemTexture.height / itemTexture.width;
        ctx.DrawTexturePro(
          itemTexture,
          {
            x: 0,
            y: 0,
            width: itemTexture.width,
            height: itemTexture.height,
          },
          {
            x: this.position.x + 61.5 - 45,
            y: this.position.y + 61.5 - (90 * ratio) / 2,
            width: 90,
            height: 90 * ratio,
          },
          {
            x: 0,
            y: 0,
          },
          0,
          ctx.WHITE
        );
      }
    } else {
      ctx.DrawTexture(
        itemTexture,
        this.position.x + 61.5 - itemTexture.width / 2,
        this.position.y + 61.5 - itemTexture.height / 2,
        ctx.WHITE
      );
    }
  }
}
