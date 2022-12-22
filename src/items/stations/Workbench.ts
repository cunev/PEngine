import { Item } from "../Item";
import { ManhuntAxe } from "../weapons/ManhuntAxe";
import { Stick } from "../elements/Stick";
import { Rock } from "../elements/Rock";
import { Plank } from "../elements/Plank";

export class Workbench extends Item {
  static instance;

  texture = "craftingBench.png";
  name: string = "Workbench";
  description: string = "Used to build advanced tools";

  static {
    this.instance = new this();
  }
  getRecipe(): { item: Item; amount: number }[] {
    return [
      { item: Plank.instance, amount: 5 },
      { item: Rock.instance, amount: 5 },
    ];
  }
}
