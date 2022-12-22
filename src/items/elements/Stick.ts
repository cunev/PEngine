import { Item } from "../Item";
import { Plank } from "./Plank";

export class Stick extends Item {
  static instance;

  texture = "stick.png";
  name: string = "Wooden Stick";
  description: string = "Useful piece of wood";

  static {
    this.instance = new this();
  }
  getRecipe(): { item: Item; amount: number }[] {
    return [{ item: Plank.instance, amount: 1 }];
  }
}
