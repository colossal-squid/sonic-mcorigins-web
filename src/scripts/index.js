import "../styles/index.scss";
import * as PIXI from "pixi.js";
import { init, render } from "./svg-render";
import { state, update } from "./game";
import { initControls, clearControls } from "./controls";

// Create a PixiJS application of type cavas with specify background color and make it resizes to the iframe window
const app = new PIXI.Application({
  background: "#1099bb",
  width: 561,
  height: 719,
});

let sprite = PIXI.Sprite.from("assets/arvolleyball/arvolleyball_bg_crop.jpg");
sprite.width = 561;
sprite.height = 719;
app.stage.addChild(sprite);

async function createSvgImage() {
  const svg = document.createElement("svg");
  svg.className = "lcd-screen";
  svg.innerHTML = await fetch("assets/arvolleyball/arvolleyball.svg")
    .then((res) => res.text())
    .then((text) => {
      return text;
    });
  return svg;
}

// Adding the application's view to the DOM
document.body.appendChild(app.view);
const FPS = 2;
async function run() {
  document.body.appendChild(await createSvgImage());
  init();
  initControls();
  setInterval(() => {
    update();
    render(state);
    clearControls();
  }, 1000 / FPS);
}

run();
