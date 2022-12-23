import { readdirSync, readFileSync } from "fs";
import path from "path";
import { Texture } from "raylib";
import { loadImage, Image } from "skia-canvas";
import { ctx } from "../../app";

export const assets = new Map<string, Texture>();

export function loadTexture(path: string) {
  const img = ctx.LoadImage(path);
  const texture = ctx.LoadTextureFromImage(img);
  ctx.UnloadImage(img);
  return texture;
}

export function loadAssets() {
  const assetsFolder = path.join(process.cwd(), "assets");
  const imageAssets = readdirSync(assetsFolder).filter((file) =>
    [".png", ".jpg", ".jpeg"].includes(path.parse(file).ext)
  );

  const textures = imageAssets.map((assetName) => {
    const image = loadTexture(path.join(assetsFolder, assetName));
    return { textureName: assetName, image };
  });

  for (const texture of textures) {
    assets.set(texture.textureName, texture.image);
  }
}
