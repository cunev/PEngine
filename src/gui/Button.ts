import { ctx } from "../../app";
import { InputManager } from "../core/InputManager";
import { Vector2 } from "../core/Math";
import { assets } from "../core/TextureManager";
import { Item } from "../items/Item";

export class Button {
  holdItem: Item | null = null;
  position: Vector2 = { x: 0, y: 0 };
  tag: string = "";
  visible: boolean = true;
  draw() {
    if (!this.visible) return;
    ctx.drawImage(
      assets.get("inventoryButton.png")!,
      this.position.x,
      this.position.y
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
    const itemTexture = this.holdItem!.texture;
    const ratio = itemTexture.width / itemTexture.height;

    if (itemTexture.height > itemTexture.width) {
      ctx.drawImage(
        itemTexture,
        this.position.x + 58 - (ratio * 72) / 2,
        this.position.y + 44 - 36,
        ratio * 55,
        55
      );
    } else {
      const ratio = itemTexture.height / itemTexture.width;
      ctx.drawImage(
        itemTexture,
        this.position.x + 25,
        this.position.y + 44 - (ratio * 72) / 2,
        55,
        ratio * 55
      );
    }
  }
}
