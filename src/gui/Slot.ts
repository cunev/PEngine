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
    ctx.drawImage(
      assets.get("inventorySlot.png")!,
      this.position.x,
      this.position.y
    );
    if (this.quantity > 1)
      smallText(
        this.quantity.toString(),
        this.position.x + 14,
        this.position.y + 110
      );
    if (this.holdItem) this.drawItem();
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
