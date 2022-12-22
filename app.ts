import { Window, CanvasRenderingContext2D, App } from "skia-canvas";
import { Camera } from "./src/core/Camera";
import { Entity } from "./src/core/Entity";
import { InputManager } from "./src/core/InputManager";
import { DummyEntity } from "./src/entities/dummy/DummyEntity";
import { PlayerEntity } from "./src/entities/player/PlayerEntity";
import { loadAssets } from "./src/core/TextureManager";
import { Inventory } from "./src/gui/Inventory";
import TWEEN from "@tweenjs/tween.js";
// import { Client, connectTestserver } from "./src/core/Steam";
import { AfterDraw } from "./src/core/AfterDraw";

export let ctx: CanvasRenderingContext2D;
export let win: Window;
export let dt: number = 0;

async function main() {
  // await connectTestserver();
  await loadAssets();
  createWindow();
}

App.fps = 200;

function createWindow() {
  win = new Window(1920, 1080, { left: 1920, top: 0 });
  win.title = "Pretend Engine";
  win.fullscreen = true;
  ctx = win.canvas.getContext("2d");
  InputManager.createInput();
  Inventory.create();
  let entity = new PlayerEntity();
  Camera.focus(entity);
  let lastTime = Date.now();
  win.on("draw", () => {
    // Client.listen();
    ctx.fillStyle = "#1E1E1E";
    ctx.fillRect(0, 0, 1920, 1080);
    dt = (Date.now() - lastTime) / 8;
    lastTime = Date.now();
    Camera.update();
    for (const entity of Entity.all) {
      entity.update();
      entity.draw();
    }
    Inventory.update();
    AfterDraw.drawAfterDraw();
    TWEEN.update();
  });
}

main();
