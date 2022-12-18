import { readdirSync, readFileSync } from "fs";
import path from "path";
import { loadImage, Image } from "skia-canvas";

export const assets = new Map<string, Image>();

export function loadTexture(path: string) {
  return loadImage(readFileSync(path));
}

export async function loadAssets() {
  const assetsFolder = path.join(process.cwd(), "assets");
  const imageAssets = readdirSync(assetsFolder).filter((file) =>
    [".png", ".jpg", ".jpeg"].includes(path.parse(file).ext)
  );

  const textures = await Promise.all(
    imageAssets.map(async (assetName) => {
      const image = await loadTexture(path.join(assetsFolder, assetName));
      return { textureName: assetName, image };
    })
  );

  for (const texture of textures) {
    assets.set(texture.textureName, texture.image);
  }
}
