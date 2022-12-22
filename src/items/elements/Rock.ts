import { Item } from "../Item";

export class Rock extends Item {
  static instance;

  texture = "rock.png";
  name: string = "Rock";
  description: string = "A piece of rock";

  static {
    this.instance = new this();
  }

  getRecipe() {
    return [];
  }
}
