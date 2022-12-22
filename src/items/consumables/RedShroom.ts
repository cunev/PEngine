import { Item } from "../Item";

export class RedShroom extends Item {
  static instance;

  texture = "item1.png";
  name: string = "Red Mushroom";
  description: string = "A magical piece of food";
  craftable: boolean = false;

  static {
    this.instance = new this();
  }

  getRecipe() {
    return [];
  }
}
