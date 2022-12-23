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
    ctx.rlPushMatrix();
    ctx.rlTranslatef(this.position.x, this.position.y, 0);
    if (this.isInside()) {
      // ctx.globalAlpha = 1;
    } else {
      // ctx.globalAlpha = 0.86;
    }

    ctx.DrawTexture(assets.get("inventoryButton.png")!, 0, 0, ctx.WHITE);
    if (this.holdItem) this.drawItem();

    if (this.isInside()) {
      this.drawNotice();
    }
    ctx.rlPopMatrix();
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
      const recipe = this.holdItem!.getRecipe();
      ctx.rlTranslatef(
        InputManager.relativeMouseX,
        InputManager.relativeMouseY,
        0
      );
      // ctx.strokeStyle = "rgb(40, 40, 40)";
      // ctx.fillStyle = "rgba(17, 17, 17, 0.99)";
      // ctx.roundRect(
      //   InputManager.relativeMouseX,
      //   InputManager.relativeMouseY,
      //   300,
      //   recipe.length * 60 + 16,
      //   5
      // );
      // ctx.fill();
      // ctx.stroke();

      tinyText("Requires", 15, 25);
      recipe.forEach((e, index) => {
        const itemTexture = e.item.getTexture()!;
        if (itemTexture.height > itemTexture.width) {
          const ratio = itemTexture.width / itemTexture.height;
          ctx.DrawTexturePro(
            itemTexture,
            {
              x: 61.5 - (ratio * 90) / 2,
              y: 61.5 - 45 + index * 60,
              width: itemTexture.width,
              height: itemTexture.height,
            },
            { x: 0, y: 0, width: ratio * 45, height: 45 },
            { x: 0, y: 0 },
            0,
            ctx.WHITE
          );
        } else {
          const ratio = itemTexture.height / itemTexture.width;
          ctx.DrawTexturePro(
            itemTexture,
            {
              x: 61.5 - 45,
              y: 61.5 - (ratio * 90) / 2 + index * 60,
              width: itemTexture.width,
              height: itemTexture.height,
            },
            { x: 0, y: 0, width: 45, height: ratio * 45 },
            { x: 0, y: 0 },
            0,
            ctx.WHITE
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
      ctx.DrawTexturePro(
        itemTexture,
        {
          x: 58 - (ratio * 72) / 2,
          y: 44 - 36,
          width: itemTexture.width,
          height: itemTexture.height,
        },
        { x: 0, y: 0, width: ratio * 55, height: 55 },
        { x: 0, y: 0 },
        0,
        ctx.WHITE
      );
    } else {
      const ratio = itemTexture.height / itemTexture.width;
      ctx.DrawTexturePro(
        itemTexture,
        {
          x: 25,
          y: 44 - (ratio * 72) / 2,
          width: itemTexture.width,
          height: itemTexture.height,
        },
        { x: 0, y: 0, width: 55, height: ratio * 55 },
        { x: 0, y: 0 },
        0,
        ctx.WHITE
      );
    }
  }
}
