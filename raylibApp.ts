import r from "raylib";

const screenWidth = 800;
const screenHeight = 450;
r.InitWindow(screenWidth, screenHeight, "raylib [core] example - basic window");
r.SetTargetFPS(60);
let img = r.LoadImage("./assets/item1.png");
const texture = r.LoadTextureFromImage(img);
r.UnloadImage(img);
while (!r.WindowShouldClose()) {
  r.BeginDrawing();
  r.ClearBackground(r.RAYWHITE);
  r.DrawTexture(texture, 0, 0, r.WHITE);
  r.DrawText(
    "Congrats! You created your first node-raylib window!",
    120,
    200,
    20,
    r.LIGHTGRAY
  );
  r.EndDrawing();
}
r.CloseWindow();
