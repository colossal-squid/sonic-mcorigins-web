import "../styles/index.scss";
import { init, render } from "./svg-render";
import { state, update } from "./game";
import { initControls, clearControls } from "./controls";

async function createImage(src, className) {
  const img = document.createElement("img");
  img.className = className;;
  img.src = src;
  return img;
}

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


const FPS = 2;
async function run() {
  document.body.appendChild(await createImage("assets/arvolleyball/arvolleyball_front.jpg", "lcd-game"));
  document.body.appendChild(await createImage("assets/arvolleyball/arvolleyball_bg.jpg", "lcd-background"));
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
