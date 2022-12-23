import { Texture } from "raylib";
import { Image } from "skia-canvas/lib";
import { assets } from "../core/TextureManager";

export abstract class Item {
  type = "Misc";
  abstract name: string;
  abstract description: string;
  abstract texture: string;
  abstract getRecipe(): { item: Item; amount: number }[];

  constructor() {
    console.log("new item");
  }

  private textureImage?: Texture;

  getTexture = () => {
    if (this.textureImage) {
      return this.textureImage;
    }
    this.textureImage = assets.get(this.texture)!;
    return this.textureImage;
  };
}

export abstract class Consumable extends Item {
  type = "Consumable";
}

export abstract class Weapon extends Item {
  type = "Weapon";
}
