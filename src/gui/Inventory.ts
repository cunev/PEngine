import { ctx } from "../../app";
import { Camera } from "../core/Camera";
import { InputManager } from "../core/InputManager";
import { Tween, Easing } from "@tweenjs/tween.js";
import { assets } from "../core/TextureManager";
import { largeText, smallText } from "../core/Text";
import { Slot } from "./Slot";
import { Button } from "./Button";
import { Item } from "../items/Item";
import { BlueShroom } from "../items/consumables/BlueShroom";
import { Stick } from "../items/elements/Stick";
import { Workbench } from "../items/stations/Workbench";
import { Campfire } from "../items/stations/Campfire";
import { RedShroom } from "../items/consumables/RedShroom";
import { Plank } from "../items/elements/Plank";
import { Rock } from "../items/elements/Rock";
export class Inventory {
  private static inventoryShowing = false;
  private static slots: Slot[] = [];
  private static startSlot: Slot;
  private static dragItem: { item: Item | null; quantity: number } = {
    item: null,
    quantity: 0,
  };

  private static craftingButtons: Button[] = [];

  static create() {
    InputManager.events.on("keydown", (e) => {
      if (e == ctx.KEY_TAB) {
        this.toggle();
      }
    });
    // win.on("mousedown", (e) => {
    //   if (e.button !== 0) return;
    //   let selectedSlot: Slot | null = null;
    //   for (let i = 0; i < this.slots.length; i++) {
    //     const slot = this.slots[i];
    //     if (slot.isInside()) {
    //       selectedSlot = slot;
    //       break;
    //     }
    //   }
    //   if (!selectedSlot) return;
    //   this.startSlot = selectedSlot;
    //   this.dragItem.item = selectedSlot.holdItem;
    //   this.dragItem.quantity = selectedSlot.quantity;

    //   selectedSlot.holdItem = null;
    //   selectedSlot.quantity = 1;
    // });

    // win.on("mouseup", (e) => {
    //   if (e.button !== 0) return;
    //   let selectedSlot: Slot | null = null;
    //   for (let i = 0; i < this.slots.length; i++) {
    //     const slot = this.slots[i];
    //     if (slot.isInside()) {
    //       selectedSlot = slot;
    //       break;
    //     }
    //   }
    //   if (!selectedSlot) {
    //     if (this.dragItem && this.startSlot && this.dragItem.item) {
    //       this.startSlot.holdItem = this.dragItem.item;
    //       this.startSlot.quantity = this.dragItem.quantity;
    //       this.dragItem.item = null;
    //     }
    //     return;
    //   }

    //   if (
    //     selectedSlot.holdItem &&
    //     selectedSlot.holdItem.name == this.dragItem.item!.name
    //   ) {
    //     this.startSlot.holdItem = null;
    //     this.startSlot.quantity = 1;
    //     selectedSlot.quantity += this.dragItem.quantity;
    //   } else {
    //     this.startSlot.holdItem = selectedSlot.holdItem;
    //     this.startSlot.quantity = selectedSlot.quantity;
    //     selectedSlot.holdItem = this.dragItem.item;
    //     selectedSlot.quantity = this.dragItem.quantity;
    //   }

    //   this.dragItem.item = null;
    // });

    for (let i = 0; i < 4; i++) {
      let createdSlot = new Slot();
      createdSlot.position = { x: 25 + 130 * i, y: 25 };
      createdSlot.tag = "main";
      this.slots.push(createdSlot);
    }

    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 4; i++) {
        let createdSlot = new Slot();
        createdSlot.position = { x: 25 + 130 * i, y: 270 + j * 130 };
        createdSlot.tag = "inventory";
        createdSlot.visible = false;
        this.slots.push(createdSlot);
      }
    }
    this.slots[2].holdItem = Workbench.instance;
    this.slots[2].quantity = 5;

    for (let i = 0; i < 3; i++) {
      let createdButton = new Button();
      createdButton.position = { x: 600, y: 270 + i * 86 };
      this.craftingButtons.push(createdButton);
    }

    this.craftingButtons[0].holdItem = Workbench.instance;
    this.craftingButtons[1].holdItem = Campfire.instance;
    this.craftingButtons[2].holdItem = Stick.instance;
  }

  static toggle() {
    console.log("abc");
    this.inventoryShowing = !this.inventoryShowing;
    const inventorySlots = this.slots.filter(
      (slot) => slot.tag === "inventory"
    );
    if (this.inventoryShowing) {
      new Tween({ value: 0.7 })
        .to({ value: 0.8 }, 200)
        .easing(Easing.Quadratic.Out)
        .onUpdate((value) => {
          Camera.scale = value.value;
        })
        .start();

      InputManager.blockInput(true);
      for (const slot of inventorySlots) {
        slot.visible = true;
      }
    } else {
      new Tween({ value: 0.8 })
        .to({ value: 0.7 }, 200)
        .easing(Easing.Quadratic.Out)

        .onUpdate((value) => {
          Camera.scale = value.value;
        })
        .start();
      InputManager.blockInput(false);
      for (const slot of inventorySlots) {
        slot.visible = false;
      }
    }
  }

  static update() {
    this.draw();
  }

  static draw() {
    ctx.rlPushMatrix();
    Camera.untranslate();
    ctx.rlTranslatef(0, 0, 0);

    for (const slot of this.slots) {
      slot.draw();
    }

    if (this.inventoryShowing) {
      largeText("Inventory", 32, 240);
      largeText("Crafting", 600, 240);
      for (const button of this.craftingButtons) {
        button.draw();
      }
    }
    this.drawDragItem();
    ctx.rlPopMatrix();
  }

  static drawDragItem() {
    if (!this.dragItem.item) return;

    if (this.dragItem.quantity > 1)
      smallText(
        this.dragItem.quantity.toString(),
        InputManager.relativeMouseX + 14 - 123 / 2,
        InputManager.relativeMouseY + 110 - 123 / 2
      );
    const itemTexture = this.dragItem.item.getTexture();
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
          { x: 0, y: 0, width: ratio * 100, height: 100 },
          {
            x: InputManager.relativeMouseX - (ratio * 90) / 2,
            y: InputManager.relativeMouseY - 45,
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
          { x: 0, y: 0, width: 90, height: 90 * ratio },
          {
            x: InputManager.relativeMouseX - 45,
            y: InputManager.relativeMouseY - (ratio * 90) / 2,
          },
          0,
          ctx.WHITE
        );
      }
    } else {
      ctx.DrawTexture(
        itemTexture,
        InputManager.relativeMouseX - itemTexture.width / 2,
        InputManager.relativeMouseY - itemTexture.height / 2,
        ctx.WHITE
      );
    }
  }
}
