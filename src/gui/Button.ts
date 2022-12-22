import { ctx } from "../../app";
import { AfterDraw } from "../core/AfterDraw";
import { Camera } from "../core/Camera";
import { InputManager } from "../core/InputManager";
import { Vector2 } from "../core/Math";
import { smallText, tinyText } from "../core/Text";
import { assets } from "../core/TextureManager";
import { Item } from "../items/Item";

export class Button {
  holdItem: Item | null = null;
  position: Vector2 = { x: 0, y: 0 };
  tag: string = "";
  visible: boolean = true;
  private xoff = 0;
  draw() {
    if (!this.visible) return;
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    if (this.isInside()) {
      ctx.globalAlpha = 1;
    } else {
      ctx.globalAlpha = 0.86;
    }

    ctx.drawImage(assets.get("inventoryButton.png")!, 0, 0);
    if (this.holdItem) this.drawItem();

    if (this.isInside()) {
      this.drawNotice();
    }
    ctx.restore();
  }

  isInside() {
    return (
      this.visible &&
      InputManager.relativeMouseX > this.position.x &&
      InputManager.relativeMouseY > this.position.y &&
      InputManager.relativeMouseX < this.position.x + 386 &&
      InputManager.relativeMouseY < this.position.y + 73
    );
  }

  private drawNotice() {
    AfterDraw.createAfterDraw(1, () => {
      Camera.untranslate();
      const recipe = this.holdItem!.getRecipe();
      ctx.translate(InputManager.relativeMouseX, InputManager.relativeMouseY);
      ctx.strokeStyle = "rgb(40, 40, 40)";
      ctx.fillStyle = "rgba(17, 17, 17, 0.99)";
      ctx.roundRect(
        InputManager.relativeMouseX,
        InputManager.relativeMouseY,
        300,
        recipe.length * 60 + 16,
        5
      );
      ctx.fill();
      ctx.stroke();

      tinyText("Requires", 15, 25);
      recipe.forEach((e, index) => {
        const itemTexture = e.item.getTexture();
        if (itemTexture.height > itemTexture.width) {
          const ratio = itemTexture.width / itemTexture.height;
          ctx.drawImage(
            itemTexture,
            61.5 - (ratio * 90) / 2,
            61.5 - 45 + index * 60,
            ratio * 45,
            45
          );
        } else {
          const ratio = itemTexture.height / itemTexture.width;
          ctx.drawImage(
            itemTexture,
            61.5 - 45,
            61.5 - (ratio * 90) / 2 + index * 60,
            45,
            ratio * 45
          );
        }
        tinyText(`x${e.amount} ${e.item.name}`, 82, 50 + index * 60);
      });
    });
  }

  private drawItem() {
    if (!this.holdItem) return;
    const itemTexture = this.holdItem!.getTexture();
    const ratio = itemTexture.width / itemTexture.height;
    smallText(this.holdItem.name, 90, 33);
    tinyText(this.holdItem.description, 90, 53);

    if (itemTexture.height > itemTexture.width) {
      ctx.drawImage(
        itemTexture,
        58 - (ratio * 72) / 2,
        44 - 36,
        ratio * 55,
        55
      );
    } else {
      const ratio = itemTexture.height / itemTexture.width;
      ctx.drawImage(itemTexture, 25, 44 - (ratio * 72) / 2, 55, ratio * 55);
    }
  }
}
