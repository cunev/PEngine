import { Image } from "skia-canvas/lib";
import { assets } from "../../core/TextureManager";
import { Consumable, Item } from "../Item";

export class BlueShroom extends Consumable {
  static instance;

  texture = "item4.png";

  name: string = "Blue Mushroom";
  description: string = "A magical piece of food";
  craftable: boolean = false;

  static {
    this.instance = new this();
  }

  getRecipe(): { item: Item; amount: number }[] {
    return [];
  }
}
