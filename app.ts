import r from "raylib";
import { Camera } from "./src/core/Camera";
import { Entity } from "./src/core/Entity";
import { InputManager } from "./src/core/InputManager";
import { DummyEntity } from "./src/entities/dummy/DummyEntity";
import { PlayerEntity } from "./src/entities/player/PlayerEntity";
import { assets, loadAssets } from "./src/core/TextureManager";
import { Inventory } from "./src/gui/Inventory";
import TWEEN from "@tweenjs/tween.js";
import { AfterDraw } from "./src/core/AfterDraw";

export let ctx: typeof r = r;
export let dt: number = 0;
export const width = 1600;
export const height = 900;
r.InitWindow(width, height, "Pretend Reloaded [raylib]");
r.SetWindowPosition(1920, 30);
r.SetTargetFPS(120);
loadAssets();

let lastTime = Date.now();
let entity = new PlayerEntity();
Camera.focus(entity);
Inventory.create();

while (!r.WindowShouldClose()) {
  dt = (Date.now() - lastTime) / 8;
  lastTime = Date.now();

  r.BeginDrawing();
  r.ClearBackground(r.RAYWHITE);
  Camera.update();
  InputManager.updateInput();

  for (const entity of Entity.all) {
    entity.update();
    entity.draw();
  }
  Inventory.update();
  AfterDraw.drawAfterDraw();
  TWEEN.update();

  r.EndDrawing();
}
