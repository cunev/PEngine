import { Image } from "skia-canvas/lib";
import { assets } from "../../core/TextureManager";
import { Item } from "../Item";

export class ManhuntAxe extends Item {
  static instance;

  texture = "item3.png";
  name: string = "Manhunt Axe";
  description: string = "A magical piece of food";

  static {
    this.instance = new this();
  }

  getRecipe() {
    return [];
  }
}
