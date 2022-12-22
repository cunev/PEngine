import { Item } from "../Item";

export class Plank extends Item {
  static instance;

  texture = "plank.png";
  name: string = "Wooden Plank";
  description: string = "A longer wood";

  static {
    this.instance = new this();
  }

  getRecipe() {
    return [];
  }
}
