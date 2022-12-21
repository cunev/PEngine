import { Image } from "skia-canvas/lib";
import { assets } from "../core/TextureManager";
import { Item } from "./Item";
import { RedShroom } from "./RedShroom";

export class BlueShroom extends Item {
  id: string = "BlueShroom";
  texture: Image = assets.get("item4.png")!;
  name: string = "Red Mushroom";
  description: string = "A magical piece of food";
  craftable: boolean = false;
  recipe: [typeof Item, number][] = [[RedShroom, 1]];
}
