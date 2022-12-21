import { ctx, win } from "../../app";
import { Camera } from "../core/Camera";
import { InputManager } from "../core/InputManager";
import { Tween, Easing } from "@tweenjs/tween.js";
import { assets } from "../core/TextureManager";
import { largeText, smallText } from "../core/Text";
import { Slot } from "./Slot";
import { Button } from "./Button";
import { RedShroom } from "../items/RedShroom";
import { Item } from "../items/Item";
import { BlueShroom } from "../items/BlueShroom";
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
    win.on("keydown", (e) => {
      if (e.repeat) return;
      if (e.key == "Tab") {
        this.toggle();
      }
    });
    win.on("mousedown", (e) => {
      if (e.button !== 0) return;
      let selectedSlot: Slot | null = null;
      for (let i = 0; i < this.slots.length; i++) {
        const slot = this.slots[i];
        if (slot.isInside()) {
          selectedSlot = slot;
          break;
        }
      }
      if (!selectedSlot) return;
      this.startSlot = selectedSlot;
      this.dragItem.item = selectedSlot.holdItem;
      this.dragItem.quantity = selectedSlot.quantity;

      selectedSlot.holdItem = null;
      selectedSlot.quantity = 1;
    });

    win.on("mouseup", (e) => {
      if (e.button !== 0) return;
      let selectedSlot: Slot | null = null;
      for (let i = 0; i < this.slots.length; i++) {
        const slot = this.slots[i];
        if (slot.isInside()) {
          selectedSlot = slot;
          break;
        }
      }
      if (!selectedSlot) {
        if (this.dragItem && this.startSlot) {
          this.startSlot.holdItem = this.dragItem.item;
          this.startSlot.quantity = this.dragItem.quantity;
          this.dragItem.item = null;
        }
        return;
      }

      if (
        selectedSlot.holdItem &&
        selectedSlot.holdItem.id == this.dragItem.item!.id
      ) {
        this.startSlot.holdItem = null;
        this.startSlot.quantity = 1;
        selectedSlot.quantity += this.dragItem.quantity;
      } else {
        this.startSlot.holdItem = selectedSlot.holdItem;
        this.startSlot.quantity = selectedSlot.quantity;
        selectedSlot.holdItem = this.dragItem.item;
        selectedSlot.quantity = this.dragItem.quantity;
      }

      this.dragItem.item = null;
    });

    for (let i = 0; i < 4; i++) {
      let createdSlot = new Slot();
      createdSlot.position = { x: 25 + 130 * i, y: 25 };
      createdSlot.tag = "main";
      createdSlot.holdItem = new RedShroom();
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

    this.slots[6].holdItem = new BlueShroom();
    this.slots[6].quantity = 3;

    for (let i = 0; i < 4; i++) {
      let createdButton = new Button();
      createdButton.position = { x: 600, y: 270 + i * 80 };
      createdButton.holdItem = new RedShroom();
      this.craftingButtons.push(createdButton);
    }
  }

  static toggle() {
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
    ctx.save();
    Camera.untranslate();

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
    ctx.restore();
  }

  static drawDragItem() {
    if (!this.dragItem.item) return;

    if (this.dragItem.quantity > 1)
      smallText(
        this.dragItem.quantity.toString(),
        InputManager.relativeMouseX + 14 - 123 / 2,
        InputManager.relativeMouseY + 110 - 123 / 2
      );
    const itemTexture = this.dragItem.item.texture;
    if (itemTexture.width > 120 || itemTexture.height > 120) {
      if (itemTexture.height > itemTexture.width) {
        const ratio = itemTexture.width / itemTexture.height;
        ctx.drawImage(
          itemTexture,
          InputManager.relativeMouseX - (ratio * 90) / 2,
          InputManager.relativeMouseY - 45,
          ratio * 100,
          100
        );
      } else {
        const ratio = itemTexture.height / itemTexture.width;
        ctx.drawImage(
          itemTexture,
          InputManager.relativeMouseX - 45,
          InputManager.relativeMouseY - (ratio * 90) / 2,
          90,
          ratio * 90
        );
      }
    } else {
      ctx.drawImage(
        itemTexture,
        InputManager.relativeMouseX - itemTexture.width / 2,
        InputManager.relativeMouseY - itemTexture.height / 2
      );
    }
  }
}
