import { Image } from "skia-canvas/lib";
import { assets } from "../core/TextureManager";
import { Item } from "./Item";

export class RedShroom extends Item {
  id: string = "RedShroom";
  texture: Image = assets.get("item1.png")!;
  name: string = "Red Mushroom";
  description: string = "A magical piece of food";
  craftable: boolean = false;
  recipe: [typeof Item, number][] = [[RedShroom, 1]];
  constructor() {
    super();
    console.log(this.id);
  }
}
