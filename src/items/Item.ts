import { Image } from "skia-canvas/lib";

export abstract class Item {
  static all: Map<string, Item> = new Map<string, Item>();
  abstract id: string;
  abstract name: string;
  abstract description: string;
  abstract craftable: boolean;
  abstract recipe: [typeof Item, number][];
  abstract texture: Image;

  constructor() {
    setImmediate(() => {
      this.register();
    });
  }

  private register() {
    Item.all.set(this.id, this);
    console.log(this.id);
  }
}
