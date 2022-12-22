import { Item } from "../Item";
import { ManhuntAxe } from "../weapons/ManhuntAxe";
import { Stick } from "../elements/Stick";
import { Rock } from "../elements/Rock";
import { Plank } from "../elements/Plank";

export class Campfire extends Item {
  static instance;

  texture = "fireplace.png";
  name: string = "Campfire";
  description: string = "A small campfire";

  static {
    this.instance = new this();
  }
  getRecipe(): { item: Item; amount: number }[] {
    return [
      { item: Rock.instance, amount: 8 },
      { item: Stick.instance, amount: 4 },
    ];
  }
}
